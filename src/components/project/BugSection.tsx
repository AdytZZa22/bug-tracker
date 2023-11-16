import {CardDescription, CardFooter, CardTitle} from "@/components/ui/card";
import { convert} from "html-to-text";
import {Separator} from "@/components/ui/separator";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {IBug} from "@/types";
import Image from "next/image";
import moment from "moment"

interface Props {
    bug?: IBug
}


export default function BugSection({bug}: Props) {

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
              className="p-2.5 items-center bg-white h-[150px] min-h-[150px] text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-gray-300 cursor-grab relative"
        >
            <CardTitle className="text-2xl">{bug?.title}</CardTitle>
            <CardDescription>
                {bug?.reporter.name}, {moment(bug?.created_at).fromNow()}
            </CardDescription>

            <CardDescription className="mt-4">
                {convert(bug?.description!).slice(0, 30)}...
            </CardDescription>

            <CardFooter className="px-0 pt-2 flex justify-between">
                <Image width={20} height={20} src={bug?.developer.image!} alt={bug?.developer.name!} className="rounded-full" />
            </CardFooter>

            <Separator className="my-4" />
        </div>
    )
}