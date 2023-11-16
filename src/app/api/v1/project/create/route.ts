
import { authOptions } from "@/lib/auth";
import { CreateProjectSchema, ProjectDTO, createProjectWithoutOwnerSchema } from "@/modules/project/project.schema";
import { createProject } from "@/modules/project/project.service";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  

    const data: CreateProjectSchema  = await req.json();
    const result = createProjectWithoutOwnerSchema.safeParse(data);

    const session = await getServerSession(authOptions);

    if(!result.success) {
        return NextResponse.json({
            success: false,
            error: result.error
        })
    }
    
    const projectData: ProjectDTO = {
        ...data,
        owner_id: session?.user.id as number
    }

    try {
        const project = await createProject(projectData);


        return NextResponse.json({
            success: true,
            project: project,
            revalidated: true,
            date: Date.now() 
        })
    } catch (e: any) {
        if(e.code === "P2002") {
            return NextResponse.json({
                success: false,
                field: "slug",
                msg: "Slug is already used."
            }, {
                status: 409
            })
        } else {
            console.error('Error creating project:', e);
            return NextResponse.json({
                success: false,
                error: 'An unexpected error occurred.'
            }, {
                status: 500
            });
        }
    }
}