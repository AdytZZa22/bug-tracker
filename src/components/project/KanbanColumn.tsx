"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {PiDotsThreeCircleLight} from "react-icons/pi";
import {Separator} from "@/components/ui/separator";
import {BoardColumn, Bug} from "@prisma/client";
import BugSection from "@/components/project/BugSection";
import AddBugModal from "@/components/project/AddBugModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useToast} from "@/components/ui/use-toast";
import {useMemo, useState} from "react";
import EditColumn from "@/components/project/EditColumn";
import {ClientColumnSchema} from "@/modules/project/column.schema";
import {IBug, IMember} from "@/types";
import {ClientCreateBugSchema} from "@/modules/project/bug.schema";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useRouter} from "next/navigation";



interface Props {
    members:  IMember[]
    column: BoardColumn
    bugs: Bug[]
    deleteColumn: (columnId: number) => Promise<void>
    editColumnName: (columnId: number, name: string) => Promise<void>
    createBug: (data: ClientCreateBugSchema, columnId: number) => Promise<void>
}
export default function KanbanColumn({column, bugs, deleteColumn, editColumnName, createBug, members}: Props) {

    const [open, setOpen] = useState<boolean>(false)
    const [sheetOpen, setSheetOpen] = useState<boolean>(false)
    const { toast } = useToast()

    const router = useRouter()


    const bugsIds = useMemo(() => {
        return bugs.map((bug) => bug.id);
    }, [bugs]);


    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };


    async function handleCreateBug(data: ClientCreateBugSchema) {
        try {
            await createBug(data, column.id)
            toast({
                title: "✅ Success",
                description: "Bug has been edited successfully",
            })
        } catch (e) {
            toast({
                title: "❌ Error",
                description: "Something went wrong. Try again later.",
            })
        } finally {
            setSheetOpen(false)
        }
    }


    async function handleOnEditColumn(data: ClientColumnSchema) {

        try {
            await editColumnName(column.id, data.name)


            toast({
                title: "✅ Success",
                description: "Column has been edited successfully",
            })

        } catch (e) {
            toast({
                title: "❌ Error",
                description: "Something went wrong. Try again later.",
            })
        } finally {
            setOpen(false)
        }
    }
    async function handleDeleteColumn(columnId: number) {
        try {
            await deleteColumn(columnId)

            toast({
                title: "✅ Success",
                description: "Column has been deleted successfully",
            })
        } catch (e) {
            toast({
                title: "❌ Error",
                description: "Something went wrong. Try again later.",
            })
        }
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
      bg-blue
      opacity-40
      border-2
      border-gray-300
      rounded-md
      flex
      flex-col
      w-[350px] h-[600px] max-h-[700px]
      "
            ></div>
        );
    }

    return (
        <Card className={`w-[350px] h-[600px] max-h-[700px] rounded-md flex flex-col ${isDragging ? "z-50" : ""}`} ref={setNodeRef} style={style}>
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <div>
                        {/* Column title */}
                        <CardTitle  {...listeners} {...attributes} className="text-2xl">
                            {column.name}
                        </CardTitle>
                        <CardDescription>{bugs.length} tasks available</CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div>
                                <PiDotsThreeCircleLight className="text-gray-400 cursor-pointer" size={36} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setOpen(true)}>
                                    Edit name
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteColumn(column.id)} className="text-red-400 hover:!text-red-400">
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <AddBugModal
                    open={sheetOpen}
                    setOpen={setSheetOpen}
                    handleCreateBug={handleCreateBug}
                    members={members}
                >
                    add new
                </AddBugModal>
            </CardHeader>
            <CardContent className="overflow-y-auto">
                <Separator className="mb-2" />
                <SortableContext items={bugsIds}>
                    {bugs.map((bug) => {
                        return <BugSection key={bug.id} bug={bug as IBug} />
                    })}
                </SortableContext>
            </CardContent>

            <EditColumn defaultName={column.name} open={open} setOpen={setOpen} handleOnEditColumn={handleOnEditColumn} />
        </Card>
    )
}