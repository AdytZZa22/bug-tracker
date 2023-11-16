import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Icons} from "@/components/Icons";
import {useForm} from "react-hook-form";
import {clientColumnSchema, ClientColumnSchema} from "@/modules/project/column.schema";
import {zodResolver} from "@hookform/resolvers/zod";


interface Props {
    open: boolean
    setOpen: (state: boolean) => void
    handleOnEditColumn: (data: ClientColumnSchema) => Promise<void>
    defaultName: string
}
export default function EditColumn({open, setOpen, handleOnEditColumn, defaultName}: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false)


    const form = useForm<ClientColumnSchema>({
        resolver: zodResolver(clientColumnSchema),
        defaultValues: {
            name: defaultName,
        }
    })

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogContent>

                <DialogHeader>Edit column name</DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleOnEditColumn)}>
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