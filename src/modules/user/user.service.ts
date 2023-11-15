"use server"
import prisma from "@/lib/prisma";

export default async function getUserByEmail(email: string) {
    return prisma.user.findFirst({
        where: {
            email: email
        }
    })
}