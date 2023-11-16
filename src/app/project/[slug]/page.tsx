import {
    createBug,
    createColumn,
    createProjectInvitation,
    deleteColumn,
    editColumnName, getProjectBugsBySlug,
    getProjectBySlug
} from "@/modules/project/project.service";
import {ClientColumnSchema, ColumnSchema} from "@/modules/project/column.schema";
import {revalidatePath} from "next/cache";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import InviteUser from "@/components/project/InviteUser";
import {ClientCreateBugSchema, CreateBugSchema} from "@/modules/project/bug.schema";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/lib/auth";
import prisma from "@/lib/prisma";
import KanbanBoard from "@/components/project/KanbanBoard";
import {BoardColumn, Bug} from "@prisma/client";
import React, {Suspense} from "react";
import LoadingBoard from "@/components/LoadingBoard";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


export default async function Dashboard({params}: {
    params: { slug: string }
}) {

    const project = await getProjectBySlug(params.slug)
    const bugs = await getProjectBugsBySlug(params.slug)
    const session = await getServerSession(authOptions) as Session


    async function handleCreateNewColumn(data: ClientColumnSchema) {
        "use server"

       if(project) {
           const columnDTO: ColumnSchema = {
               name: data.name,
               project_id: project.id,
               order: 1
           }

           await createColumn(columnDTO);

           revalidatePath("/project/" + params.slug)
       }
    }

    async function handleDeleteColumn(columnId: number) {

        "use server"
        await deleteColumn(columnId, project?.id as number)

        revalidatePath("/project/" + params.slug)
    }

    async function handleEditColumn(columnId: number, name: string) {
        "use server"

        await editColumnName(name, columnId, project?.id as number)

        revalidatePath("/project/" + params.slug)
    }

    async function handleInviteUser(data: { email: string }) {
        "use server"

        return await createProjectInvitation(data.email, project?.slug as string);

    }
    async function handleCreateBug(data: ClientCreateBugSchema, columnId: number): Promise<void> {
        "use server"

        const columnExists = await prisma.boardColumn.findFirst({
            where: {
                id: columnId,
                project_id: project?.id!
            }
        })
        if(columnExists) {
            const bugDTO: CreateBugSchema = {
                project_id: project?.id!,
                reporter_id: session.user.id!,
                description: data.description!,
                title: data.title,
                developer_id: parseInt(data.developer_id),
                priority: data.priority,
                status: "NEW",
                column_id: columnId,
                order_in_column: 1

            }
            await createBug(bugDTO)

            revalidatePath("/project/" + project?.slug)
        }
    }

    async function handleUpdateColumnOrder(columns: BoardColumn[]) {
        "use server"

        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];

            await prisma.boardColumn.update({
                where: {
                    id: column.id,
                    project_id: project?.id
                },
                data: { order: i + 1 }
            });
        }
    }
    async function handleUpdateBugsOrder(bugs: Bug[]) {
        "use server"

        for(let i = 0; i < bugs.length; i++) {
            const bug = bugs[i];
            await prisma.bug.update({
                where: {
                    id: bug.id,
                    project_id: project?.id!
                },
                data: {
                    order_in_column: i + 1,
                    column_id: bug.column_id
                }
            })
        }
    }
    return (
        <>
            <Suspense fallback={<LoadingBoard />}>
                <div className="flex-1 flex min-h-screen m-auto items-center w-full overflow-x-auto overflow-y-hidden px-[40px]">
                    <div className="flex-col">
                        <div className="flex space-x-2 mb-3">
                            {project?.projectMembership.map(member => (
                                <TooltipProvider key={member.id}>
                                    <Tooltip delayDuration={400}>
                                        <TooltipTrigger asChild>
                                            <Avatar>
                                                <AvatarImage src={member.user.image!} alt={member.user.name!} />
                                            </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            <p>{member.user.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}


                            <InviteUser handleInviteUser={handleInviteUser} />
                        </div>
                        <KanbanBoard handleCreateNewColumn={handleCreateNewColumn} handleUpdateBugsOrder={handleUpdateBugsOrder} handleUpdateColumnOrder={handleUpdateColumnOrder} defaultCols={project?.columns!} defaultBugs={bugs!} handleDeleteColumn={handleDeleteColumn} handleEditColumn={handleEditColumn} handleCreateBug={handleCreateBug} members={project?.projectMembership!} />
                    </div>
                </div>
            </Suspense>
        </>

    // <div className="flex flex-col w-auto">
    //     <AddColumn createNewColumn={handleCreateNewColumn} />
    // </div>
    );
}