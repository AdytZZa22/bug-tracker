"use server";
import "server-only"
import prisma from '@/lib/prisma';
import {ProjectDTO} from './project.schema';
import {revalidatePath} from "next/cache";
import {ColumnSchema} from "@/modules/project/column.schema";

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

export async function deleteColumn(columnId: number, projectId: number) {
    return prisma.column.delete({
        where: {
            id: columnId,
            project_id: projectId
        }
    })
}

export async function editColumnName(name: string, columnId: number, projectId: number) {
    return prisma.column.update({
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
    return prisma.column.create({
        data: columnDTO
    })
}

export async function getUsersInProject(projectId: number) {
    return prisma.project.findUnique({
      where: {
          id: projectId,
      },
      include: {
          owner: true,
          projectMembership: {
              include: {
                  user: true,
              },
          },
      },
  });
}

export async function getProjectBySlug(slug: string) {
    return prisma.project.findFirst({
        where: {
            slug: slug
        },
        include: {
            column: true
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