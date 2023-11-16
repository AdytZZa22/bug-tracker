"use client"
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {clientColumnSchema, ClientColumnSchema} from "@/modules/project/column.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {Icons} from "@/components/Icons";
import {useToast} from "@/components/ui/use-toast";


interface Props {
    createNewColumn: (data: ClientColumnSchema) => Promise<any>
}
export default function AddColumn({createNewColumn}: Props) {

    const { toast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const form = useForm<ClientColumnSchema>({
        resolver: zodResolver(clientColumnSchema),
        defaultValues: {
            name: "",
        }
    })


    async function handleOnSubmitColumn(data: ClientColumnSchema) {

        try {
            setIsLoading(true)

            await createNewColumn(data);

            toast({
                title: "✅ Success",
                description: "Column has been added successfully",
            })
        } catch (e) {

            toast({
                title: "❌ Error",
                description: "Something went wrong",
            })

        } finally {
            setIsLoading(false)
            setOpen(false)
        }
    }
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger>
                <Button asChild>
                    <div>
                        Create Column
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Create new column</DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleOnSubmitColumn)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="To do" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="mt-2" disabled={isLoading}>
                            {
                                isLoading &&
                                <Icons.spinner />
                            }
                            Submit
                        </Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}