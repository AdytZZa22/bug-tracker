"use client"
import {BsPlusCircle} from "react-icons/bs";
import {Button} from "@/components/ui/button";
import React, {ReactNode} from "react";
import {useForm} from "react-hook-form";
import {clientCreateBugSchema, ClientCreateBugSchema} from "@/modules/project/bug.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";

import { Editor } from "novel";
interface Props {
    children: ReactNode | string
}
export default function AddBugModal({ children }: Props) {

    const form = useForm<ClientCreateBugSchema>({
        resolver: zodResolver(clientCreateBugSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    })
    return (
        <Sheet>
            <SheetTrigger>
                <Button asChild className="flex w-full">
                    <div>
                    {typeof children === "string" && <BsPlusCircle className="mx-2" />}
                    {children}

                    </div>
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[800px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Create new bug</SheetTitle>
                </SheetHeader>
                
                <Form {...form}>
                    <form className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Bug on home page" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <Editor className="" disableLocalStorage={true} onUpdate={field.onChange} />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <SheetFooter>
                    <Button asChild className="flex w-full cursor-pointer mt-2">
                        <div>Create</div>
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}