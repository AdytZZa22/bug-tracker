import {z} from "zod";

export const columnSchema = z.object({
    name: z.string().min(3),
    project_id: z.number(),
    order: z.number()
})

export const clientColumnSchema =  columnSchema.omit({
    project_id: true,
    order: true,
})

export type ClientColumnSchema = z.infer<typeof clientColumnSchema>
export type ColumnSchema = z.infer<typeof columnSchema>