"use client"

import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {FaUserPlus} from "react-icons/fa";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useToast} from "@/components/ui/use-toast";
import {Icons} from "@/components/Icons";

const inviteSchema = z.object({
    email: z.string().email()
})
type InviteSchema = z.infer<typeof inviteSchema>
interface Props {
    handleInviteUser: (data: InviteSchema) => Promise<{ success: boolean; msg: string; }>
}
export default function InviteUser({ handleInviteUser }: Props) {


    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<InviteSchema>({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            email: ""
        }
    })

    async function handleSubmit(data: InviteSchema) {
       try {
           setIsLoading(true)
           const result = await handleInviteUser(data)

           if(result.success) {
               toast({
                   title: "✅ Success",
                   description: result.msg
               })
           } else {
               toast({
                   title: "❌ Error",
                   description: result.msg
               })
           }
       } catch (e) {
           toast({
               title: "❌ Error",
               description: "Something went wrong, try again later"
           })
       } finally {
           setIsLoading(false)
       }
    }


    return (
        <Dialog>
            <DialogTrigger>
                <TooltipProvider>
                    <Tooltip delayDuration={400}>
                        <TooltipTrigger asChild>
                            <div className="bg-gray-100 hover:bg-gray-300 transition-all  p-2 rounded-full">
                                <FaUserPlus size={20} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p>Add new user</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Invite new user</DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Bug tracker" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Invite your favorite partner to work on your masterpiece
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="mt-2" disabled={isLoading}>
                           <div>
                               {
                                   isLoading &&
                                   <Icons.spinner />
                               }
                               Submit
                           </div>
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}