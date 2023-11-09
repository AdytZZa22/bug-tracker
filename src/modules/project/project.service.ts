"use server";
import "server-only"
import prisma from '@/lib/prisma';
import { ProjectDTO } from './project.schema';
import { revalidatePath } from "next/cache";

export async function createProject(projectDTO: ProjectDTO) {
    const project = prisma.project.create({
        data: projectDTO
    })

    revalidatePath("/");

    return project;
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
  
    const uniqueProjects = Array.from(new Map(allProjects.map(project => [project.id, project])).values());
  
    return uniqueProjects;
  }