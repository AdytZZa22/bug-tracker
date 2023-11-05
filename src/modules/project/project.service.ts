"use server"
import prisma from '@/lib/prisma';
import { ProjectDTO } from './project.schema';

export async function createProject(projectDTO: ProjectDTO) {
    return prisma.project.create({
        data: projectDTO
    })
}  