import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";
import {validateSignedUrl} from "@/lib/helpers";
import {getProjectBySlug, inviteUser} from "@/modules/project/project.service";
import getUserByEmail from "@/modules/user/user.service";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export async function GET(request: NextRequest) {

    try {
        const data: {
            email: string
            project_slug: string
        } = await validateSignedUrl(request.url)

        console.log(data)


        const session = await getServerSession(authOptions)

        if(!session?.user) redirect('/login');

        const project = await getProjectBySlug(data.project_slug)
        const user = await getUserByEmail(data.email)
        if(!project || !user) redirect("/")

        const invitation = await inviteUser(user, project)

        if(!invitation) redirect("/")


        return NextResponse.redirect(new URL(`/project/${project.slug}`, request.url))

    } catch (e) {
        redirect("/project/")
    }
}