import {Bug} from "@prisma/client";
import {CardDescription, CardTitle} from "@/components/ui/card";
import { convert} from "html-to-text";
import {Separator} from "@/components/ui/separator";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface Props {
    bug?: Bug
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
                className=" opacity-30 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-blue-500  cursor-grab"
            />
        );
    }

    return (
        <div  ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
              className="p-2.5 items-center text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-gray-300 cursor-grab relative"

        >
            <CardTitle className="text-2xl">{bug?.title}</CardTitle>
            <CardDescription>
                Joseph Lingard, 6h ago
            </CardDescription>

            <CardDescription className="mt-4">
                {convert(bug?.description!).slice(0, 30)}...
            </CardDescription>

            <Separator className="my-4" />
        </div>
    )
}