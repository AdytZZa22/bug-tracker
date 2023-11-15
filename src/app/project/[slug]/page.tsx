import AddColumn from "@/components/project/AddColumn";
import {
    createBug,
    createColumn,
    createProjectInvitation,
    deleteColumn,
    editColumnName,
    getProjectBySlug
} from "@/modules/project/project.service";
import {ClientColumnSchema, ColumnSchema} from "@/modules/project/column.schema";
import {revalidatePath} from "next/cache";
import KanbanColumn from "@/components/project/KanbanColumn";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import InviteUser from "@/components/project/InviteUser";
import {ClientCreateBugSchema, CreateBugSchema, createBugSchema} from "@/modules/project/bug.schema";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/lib/auth";
import prisma from "@/lib/prisma";


export default async function Dashboard({params}: {
    params: { slug: string }
}) {

    const project = await getProjectBySlug(params.slug)
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
    return (
        <div className="flex flex-col justify-center overflow-x-auto">
            <div className="flex space-x-4 p-4">

                {project?.projectMembership.map(function (member) {
                    return (
                        <TooltipProvider key={member.id} delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar title={member.user.name as string}>
                                        <AvatarImage src={member.user.image as string} alt={member.user.name as string} />
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>{member.user.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                })}


                <InviteUser handleInviteUser={handleInviteUser} />
            </div>

            <div className="flex items-center px-4 space-x-4">
                {project?.column.map((column) => (

                    <KanbanColumn
                        key={column.id}
                        members={project.projectMembership}
                        deleteColumn={handleDeleteColumn}
                        editColumnName={handleEditColumn}
                        createBug={handleCreateBug}
                        column={column}
                    />
                ))}
                <AddColumn createNewColumn={handleCreateNewColumn} />
                {/*<KanbanBoard />*/}
            </div>
        </div>
    );
}