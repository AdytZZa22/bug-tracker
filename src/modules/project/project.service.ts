"use server";
import {compareAsc, isBefore} from 'date-fns';
import prisma from '@/lib/prisma';
import {ProjectDTO} from './project.schema';
import {revalidatePath} from "next/cache";
import {ColumnSchema} from "@/modules/project/column.schema";
import {generateSignedUrl} from "@/lib/helpers";
import {Resend} from "resend";
import ProjectInvitationTemplate from "@/components/email-templates/project-invitation-template";
import {Project, User} from "@prisma/client";

export async function createProject(projectDTO: ProjectDTO) {
    const project = prisma.project.create({
        data: projectDTO
    })

    revalidatePath("/");

    return project;
}

export async function createBug()
{
    
}

export async function inviteUser(user: User, project: Project) {

    const userInProject = await prisma.projectMembership.findFirst({
        where: {
            user_id: user.id,
            project_id: project.id
        }
    })

    if(userInProject) return userInProject


    return prisma.projectMembership.create({
        data: {
            user_id: user.id,
            project_id: project.id,
            role: "DEVELOPER"
        }
    })
}

export async function createProjectInvitation(userEmail: string, projectSlug: string) {

    const resend = new Resend(process.env.RESEND_API_KEY)
    const url = await generateSignedUrl<{
        email: typeof userEmail
        project_slug: typeof projectSlug
    }>({
        email: userEmail,
        project_slug: projectSlug
    }, 'project/invite', 1);

    const signedUrl = new URL(url).searchParams
    const currentExpiration = parseInt(signedUrl.get('exp') as string)
    const project = await getProjectBySlug(projectSlug)


    const invitation = await prisma.projectInvitation.findFirst({
        where: {
            email: userEmail,
            project_id: project?.id as number
        }
    })
    const newExpirationDate = new Date(currentExpiration)



    if(invitation) {
        const invitationExpirationTime = new Date(invitation.expiration)

        const comparisonResult = isBefore(new Date(), invitationExpirationTime)

        if(comparisonResult) {
            return {
                success: false,
                msg: "There is an active invitiation for the current user"
            }
        } else {
            await prisma.projectInvitation.update({
                where: {
                    id: invitation.id
                },
                data: {
                    expiration: newExpirationDate
                }
            })
        }
    } else {
        await prisma.projectInvitation.create({
            data: {
                url: url,
                project_id: project?.id as number,
                expiration: newExpirationDate,
                email: userEmail
            }
        })
    }

    return {
        success: true,
        msg: "User invited successfully"
    }
}
export async function deleteColumn(columnId: number, projectId: number) {
    return prisma.boardColumn.delete({
        where: {
            id: columnId,
            project_id: projectId
        }
    })
}

export async function editColumnName(name: string, columnId: number, projectId: number) {
    return prisma.boardColumn.update({
        where: {
            id: columnId,
            project_id: projectId
        },
        data: {
            name: name
        }
    })
}

export async function createColumn(columnDTO: ColumnSchema) {
    return prisma.boardColumn.create({
        data: columnDTO
    })
}

export async function getProjectMembers(projectId: number) {
    return prisma.projectMembership.findMany({
        where: {project_id: projectId},
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                }
            }
        }
    });
}

export async function getProjectBySlug(slug: string) {
    return prisma.project.findFirst({
        where: {
            slug: slug
        },
        include: {
            column: {
                orderBy: {
                    order: 'asc'
                }
            },
            projectMembership: {
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                }
            }
        }
    })
}

export async function getUserProjects(userId: number ) {
    const ownedProjects = await prisma.project.findMany({
      where: {
        owner_id: userId
      },
    });
  
    const memberProjects = await prisma.projectMembership.findMany({
      where: {
        user_id: userId
      },
      include: {
        project: true
      }
    });
  
    const allProjects = [
      ...ownedProjects,
      ...memberProjects.map(membership => membership.project)
    ];

  return Array.from(new Map(allProjects.map(project => [project.id, project])).values());
  }