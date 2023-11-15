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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {IMember} from "@/types";
import Image from "next/image";
import {BugPriority} from "@prisma/client";
interface Props {
    children: ReactNode | string,
    members: IMember[]
    handleOnSubmit: (data: ClientCreateBugSchema) => Promise<void>
}


export default function AddBugModal({ children, members, handleOnSubmit }: Props) {

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
                    <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
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
                            name="developer_id"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a partner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {members.map((member) => {
                                                    return <SelectItem key={member.id} value={member.user_id.toString()}>
                                                        <div className="flex items-center space-x-2">
                                                            <Image
                                                                className="rounded-full"
                                                                src={member.user.image as string}
                                                                alt={member.user.name as string}
                                                                width={24}
                                                                height={24}
                                                            />
                                                            <span>{member.user.name}</span>
                                                        </div>
                                                    </SelectItem>
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="priority"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select the priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {(Object.keys(BugPriority) as Array<keyof typeof BugPriority>).map((key, index) => {
                                                    return <SelectItem key={index} value={key}>{key}</SelectItem>
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                                    <Editor defaultValue="" className="" disableLocalStorage={true} onUpdate={(editor) => form.setValue("description", editor?.getHTML())} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="flex w-full cursor-pointer mt-2">
                           Create
                        </Button>
                    </form>
                </Form>
                <SheetFooter>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}