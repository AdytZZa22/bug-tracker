import AddColumn from "@/components/project/AddColumn";
import {createColumn, deleteColumn, editColumnName, getProjectBySlug} from "@/modules/project/project.service";
import {ClientColumnSchema, ColumnSchema} from "@/modules/project/column.schema";
import {revalidatePath} from "next/cache";
import BoardColumn from "@/components/project/BoardColumn";





export default async function Dashboard({params}: {
    params: { slug: string }
}) {

    const project = await getProjectBySlug(params.slug)


    console.log(project?.column)
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
    return (
        <div className="flex flex-1 items-center px-4 overflow-x-auto space-x-4">
            {project?.column.map((column) => {
                return <BoardColumn
                    key={column.id}
                    deleteColumn={handleDeleteColumn}
                    editColumnName={handleEditColumn}
                    column={column}
                />
            })}
            <AddColumn createNewColumn={handleCreateNewColumn} />

            {/*<KanbanBoard />*/}
        </div>
    )
}