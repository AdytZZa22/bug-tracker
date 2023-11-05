"use server"
import prisma from '@/lib/prisma';

export async function createProject() {
    const project = await prisma.project.create({
        data: {
            name: "Test",
            owner_id: 1
        }
    })
}