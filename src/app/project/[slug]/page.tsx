import AddColumn from "@/components/project/AddColumn";
import {
    createColumn,
    createProjectInvitation,
    deleteColumn,
    editColumnName,
    getProjectBySlug
} from "@/modules/project/project.service";
import {ClientColumnSchema, ColumnSchema} from "@/modules/project/column.schema";
import {revalidatePath} from "next/cache";
import BoardColumn from "@/components/project/BoardColumn";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import InviteUser from "@/components/project/InviteUser";


export default async function Dashboard({params}: {
    params: { slug: string }
}) {

    const project = await getProjectBySlug(params.slug)


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

        try {
            return await createProjectInvitation(data.email, project?.slug as string);
        } catch (e) {
            console.log("test back-end")

            throw e
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
                    <BoardColumn
                        key={column.id}
                        deleteColumn={handleDeleteColumn}
                        editColumnName={handleEditColumn}
                        column={column}
                    />
                ))}
                <AddColumn createNewColumn={handleCreateNewColumn} />
                {/*<KanbanBoard />*/}
            </div>
        </div>
    );
}