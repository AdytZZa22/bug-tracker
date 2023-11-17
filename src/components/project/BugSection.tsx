import {CardDescription, CardFooter, CardTitle} from "@/components/ui/card";
import { convert} from "html-to-text";
import {Separator} from "@/components/ui/separator";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {IBug} from "@/types";
import Image from "next/image";
import moment from "moment"
import * as React from "react";
import {useState} from "react";
import { FaEdit } from "react-icons/fa";
import {useAtom} from "jotai";
import {activeBugAtom, modalAtom} from "@/store";


interface Props extends React.HTMLAttributes<HTMLDivElement>{
    bug?: IBug
}


const BugSection = React.forwardRef<HTMLDivElement, Props>(({bug, ...props}) => {


    const[mouseOver, setMouseIsOver] = useState<boolean>(false)

    const [editMode, setEditMode] = useState<boolean>(false)

    const [, setOpen] = useAtom(modalAtom)
    const [, setActiveBug] = useAtom(activeBugAtom)
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: `bug-${bug?.id}`,
        data: {
            type: "Bug",
            bug,
        },
        disabled: editMode
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className=" opacity-30 p-2.5 h-[150px] min-h-[150px] items-center flex text-left rounded-xl border-2 border-blue-500 cursor-grab"
            />
        );
    }

    return (
        <div  ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
              {...props}
              onMouseEnter={() => {
                  setMouseIsOver(true);
              }}
              onMouseLeave={() => {
                  setMouseIsOver(false);
              }}
              className="p-2.5 items-center bg-white h-[150px] min-h-[150px] text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-gray-300 cursor-grab relative"
        >
            <CardTitle className="text-2xl">{bug?.title}</CardTitle>
            <CardDescription>
                {bug?.reporter.name}, {moment(bug?.created_at).fromNow()}
            </CardDescription>

            <CardDescription className="mt-4">
                {convert(bug?.description!).slice(0, 30)}...
            </CardDescription>

            {mouseOver && (
                <button
                    onClick={() => {
                        setOpen(true)
                        setActiveBug(bug!)
                    }
                }
                    onMouseEnter={() => setEditMode(true)}
                    onMouseLeave={() => setEditMode(false)}
                    className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
                >
                    <FaEdit />
                </button>
            )}

            <CardFooter className="px-0 pt-2 flex justify-between">
                <Image width={20} height={20} src={bug?.developer.image!} alt={bug?.developer.name!} className="rounded-full" />
            </CardFooter>

            <Separator className="my-4" />
        </div>
    )
})
BugSection.displayName = "BugSection"
export default BugSection