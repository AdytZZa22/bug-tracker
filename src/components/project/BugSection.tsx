import {Bug} from "@prisma/client";
import {CardDescription, CardTitle} from "@/components/ui/card";


interface Props {
    bug: Bug
}
export default function BugSection() {
    return (
        <div>
            <CardTitle className="text-2xl">Create new Wireframe</CardTitle>
            <CardDescription>
                Joseph Lingard, 6h ago
            </CardDescription>

            <CardDescription className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, atque dicta ducimus facere harum minima non optio quasi quo velit? Autem, esse fugiat itaque pariatur perspiciatis quas rem sequi ut.
            </CardDescription>
        </div>
    )
}