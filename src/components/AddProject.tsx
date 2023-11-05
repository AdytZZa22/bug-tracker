"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import {Icons} from "@/components/Icons";
import {useToast} from "@/components/ui/use-toast";
import {createProjectSchema} from "@/modules/project/project.schema";
import { createProject } from "@/modules/project/project.service"


export default function AddProject() {
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    useEffect(() => {
        setOpen(true)
    }, [])

    const form = useForm<z.infer<typeof createProjectSchema>>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
        }
    })

    async function createSite(values: z.infer<typeof createProjectSchema>) {

        setIsLoading(true)
        try {
            const res = await fetch('/api/v1/create-site', {
                method: "POST",
                body: JSON.stringify(values)
            })
            await res.json()

            toast({
                title: "✅ Success",
                description: "Project has been created successfully",
            })
        } catch (e) {
            toast({
                title: "Error",
                description: "Something went wrong. Try again later."
            })
        } finally {
            setIsLoading(false)

        }



    }

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Project</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Create new project</DialogTitle>
                    <DialogDescription>It looks like you do not have any project. You can create one right now!</DialogDescription>
                </DialogHeader>
                <Form {...form} >
                    <form action={createProject} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Bug tracker" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is just for its identification.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
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