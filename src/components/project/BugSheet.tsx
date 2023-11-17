import {Sheet, SheetContent, SheetHeader} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import {useAtom} from "jotai";
import {activeBugAtom, modalAtom} from "@/store";

export default function BugSheet() {

    const [modalOpen, setModalOpen] = useAtom(modalAtom)
    const [modalBug] = useAtom(activeBugAtom)
    return (
        <Sheet onOpenChange={setModalOpen} open={modalOpen}>
            <SheetContent className="sm:max-w-[550px] overflow-y-auto">
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
                        <p>{modalBug?.column.name}</p>
                    </div>
                </div>


                <div className="mt-10" dangerouslySetInnerHTML={{__html: modalBug?.description!}} />
            </SheetContent>
        </Sheet>
    )
}