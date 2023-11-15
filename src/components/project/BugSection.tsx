import {Bug} from "@prisma/client";
import {CardDescription, CardTitle} from "@/components/ui/card";
import { convert} from "html-to-text";

interface Props {
    bug: Bug
}
export default function BugSection({bug}: Props) {
    return (
        <div>
            <CardTitle className="text-2xl">{bug.title}</CardTitle>
            <CardDescription>
                Joseph Lingard, 6h ago
            </CardDescription>

            <CardDescription className="mt-4">
                {convert(bug.description!).slice(0, 150)}...
            </CardDescription>
        </div>
    )
}