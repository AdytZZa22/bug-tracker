import {Button} from "@/components/ui/button";

interface Props{
    url: string
}

export default function ProjectInvitationTemplate({url}: Readonly<Props>) {
    return (
        <div>
            <h1>Hello! You have been invited in our project!</h1>
            <a href={url}>
                <Button>Click</Button>
            </a>
        </div>
    )
}