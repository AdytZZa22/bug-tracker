import {Sheet, SheetContent, SheetHeader} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import React, {SyntheticEvent, useState} from "react";
import {useAtom} from "jotai";
import {activeBugAtom, modalAtom} from "@/store";
import {useSession} from "next-auth/react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Comment} from "@prisma/client";


interface Props {
    handleAddComment: (body: string, bugId: number) => Promise<Comment>

}
export default function BugSheet({handleAddComment}: Props) {

    const [modalOpen, setModalOpen] = useAtom(modalAtom)
    const [modalBug] = useAtom(activeBugAtom)

    const [comment, setComment] = useState<string>("")

    const session = useSession()

    async function handleSubmitComment(event: SyntheticEvent) {
        event.preventDefault()
        try {
            await handleAddComment(comment, modalBug?.id as number)
        } catch (e) {
            alert("Something went wrong")
        }
    }
    return (
        <Sheet onOpenChange={setModalOpen} open={modalOpen}>
            <SheetContent className="sm:max-w-[550px] overflow-y-auto flex flex-col justify-between">
                <SheetHeader className="font-bold text-2xl">
                    {modalBug?.title}
                </SheetHeader>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <Label className="font-bold">Assign to:</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Image className="rounded-full" width={24} height={24} src={modalBug?.developer.image!} alt={modalBug?.developer.name!} />
                        <p>{modalBug?.developer.name}</p>
                    </div>

                    <div>
                        <Label className="font-bold">Reporter:</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Image className="rounded-full" width={24} height={24} src={modalBug?.reporter.image!} alt={modalBug?.reporter.name!} />
                        <p>{modalBug?.reporter.name}</p>
                    </div>

                    <div>
                        <Label className="font-bold">Priority:</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p>{modalBug?.priority}</p>
                    </div>

                    <div>
                        <Label className="font-bold">Status:</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p>{modalBug?.status}</p>
                    </div>
                </div>


                <div className="mt-10" dangerouslySetInnerHTML={{__html: modalBug?.description!}} />

                <div className="mt-auto space-y-4">
                    {modalBug?.comments.map((comment, index) => (
                        <div key={index} className="flex-col flex space-x-12">
                            <div className="flex items-center space-x-4">
                                <Image className="rounded-full" width={30} height={30} src={comment.user.image ?? ""}
                                       alt={comment.user.name}/>
                                <p className="ms-2">{comment.user.name}</p>
                                <span className="font-light">{comment.created_at.toLocaleString()}</span>
                            </div>
                            <p>{comment.body}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-5 flex items-center space-x-4">
                    <Image className="rounded-full" width={30} height={30} src={session.data?.user.image!}
                           alt={session.data?.user.name!}/>
                    <Textarea value={comment} onChange={e => setComment(e.target.value)}
                              placeholder="Insert your comment here" rows={1}/>
                </div>
                <form onSubmit={handleSubmitComment}>
                    <Button>Comment</Button>
                </form>
            </SheetContent>
        </Sheet>
    )
}