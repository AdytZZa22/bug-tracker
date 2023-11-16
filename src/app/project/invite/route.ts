import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";
import {validateSignedUrl} from "@/lib/helpers";
import {getProjectBySlug, inviteUser} from "@/modules/project/project.service";
import getUserByEmail from "@/modules/user/user.service";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import prisma from "@/lib/prisma";


export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {

    try {
        const data: {
            email: string
            project_slug: string
        } = await validateSignedUrl(request.url)



        const session = await getServerSession(authOptions)

        if(!session?.user) return NextResponse.redirect(new URL(`/login`, request.url))



        const project = await getProjectBySlug(data.project_slug)
        const user = await getUserByEmail(data.email)
        if(!project || !user) return NextResponse.redirect(new URL(`/login`, request.url))


        await prisma.projectInvitation.deleteMany({
            where: {
                project_id: project.id,
                email: data.email
            }
        })

        const invitation = await inviteUser(user, project)

        if(!invitation) return NextResponse.redirect(new URL(`/`, request.url))

        console.log(project.slug)




        return NextResponse.redirect(new URL(`/project/${project.slug}`, request.url))

    } catch (e) {
        console.error(e)
        redirect("/")
    }
}