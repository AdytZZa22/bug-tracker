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
import {useState} from "react";
import EditColumn from "@/components/project/EditColumn";
import {ClientColumnSchema} from "@/modules/project/column.schema";
import {IMember} from "@/types";
import {ClientCreateBugSchema} from "@/modules/project/bug.schema";



interface Props {
    members:  IMember[]
    column: BoardColumn & {
        bugs: Bug[]
    }
    deleteColumn: (columnId: number) => Promise<void>
    editColumnName: (columnId: number, name: string) => Promise<void>
    createBug: (data: ClientCreateBugSchema, columnId: number) => Promise<void>
}
export default function KanbanColumn({column, deleteColumn, editColumnName, createBug, members}: Props) {

    const [open, setOpen] = useState<boolean>(false)
    const { toast } = useToast()


    async function handleOnSubmit(data: ClientCreateBugSchema) {
        await createBug(data, column.id)
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

    return (
        <Card className="w-[350px] min-w-[350px]">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <CardTitle className="text-2xl">
                            {column.name}
                        </CardTitle>
                        <CardDescription>{column.bugs.length} tasks available</CardDescription>
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
                <AddBugModal handleOnSubmit={handleOnSubmit} members={members}>add new</AddBugModal>
            </CardHeader>
            <CardContent>
                <Separator className="mb-2" />

                {column.bugs.map((bug) => {
                    return <BugSection key={bug.id} bug={bug} />
                })}

                <Separator className="my-4" />
            </CardContent>
            {/*<CardFooter className="flex justify-between">*/}
            {/*    <div className="space-x-2">*/}
            {/*        <span className="text-blue-400">#DEVELOPING</span>*/}
            {/*        <span className="text-pink-400">#DESIGN</span>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center text-gray-400">*/}
            {/*        <BsFillChatLeftFill className="mx-2" /><span>16</span>*/}
            {/*    </div>*/}
            {/*</CardFooter>*/}

            <EditColumn defaultName={column.name} open={open} setOpen={setOpen} handleOnEditColumn={handleOnEditColumn} />
        </Card>
    )
}