import { z } from "zod"

export const createProjectSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    slug: z.string().min(5).regex(/^[a-z][a-z0-9-]*[a-z0-9]$/, {
        message: "Invalid slug format"
    }),
    owner_id: z.number()
})
export const createProjectWithoutOwnerSchema = createProjectSchema.omit({ owner_id: true });


export type CreateProjectSchema = z.infer<typeof createProjectWithoutOwnerSchema>
export type ProjectDTO = z.infer<typeof createProjectSchema>