import { z } from "zod"

export const createProjectSchema = z.object({
    name: z.string(),
    decription: z.string().nullable().optional(),
    owner_id: z.number()
})
export const createProjectWithoutOwnerSchema = createProjectSchema.omit({ owner_id: true });


export type CreateProjectSchema = z.infer<typeof createProjectWithoutOwnerSchema>
export type ProjectDTO = z.infer<typeof createProjectSchema>