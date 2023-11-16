"use client"
import slugify from 'slugify';
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
import {Icons} from "@/components/Icons";
import {useToast} from "@/components/ui/use-toast";
import {CreateProjectSchema, createProjectWithoutOwnerSchema} from "@/modules/project/project.schema";
import { Textarea } from "./ui/textarea"


export default function AddProject() {
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { toast } = useToast()

    const form = useForm<CreateProjectSchema>({
        resolver: zodResolver(createProjectWithoutOwnerSchema),
        defaultValues: {
            name: "",
            description: "",
            slug: "",
        }
    })

    const { watch, setValue } = form;

    const name = watch('name')

    useEffect(() => {
        setValue('slug', slugify(name, { lower: true}))
    }, [name, setValue])

    async function createProject(values: CreateProjectSchema) {

        setIsLoading(true)
        try {
            const res = await fetch('/api/v1/project/create', {
                method: "POST",
                body: JSON.stringify(values),
                next: {
                    tags: ['projects']
                },
                cache: "no-cache"
            })
            const data: {
                success: boolean,
                field: "slug" | "name",
                msg: string | undefined
            } = await res.json()

            if(!data.success && data.field) {
                form.setError(data.field, {
                    type: "manual",
                    message: data.msg
                })
            } else {
                toast({
                    title: "✅ Success",
                    description: "Project has been created successfully",
                })
            }
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
                    <form onSubmit={form.handleSubmit(createProject)} className="space-y-8">
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
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="bug-tracker" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This will be the path for the project. E.g <strong>bug-tracker</strong>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Just a little description about what is happening behind the walls
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading}>
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