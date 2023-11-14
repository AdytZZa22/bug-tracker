import {z} from "zod";
import {BugPriority, BugStatus} from "@prisma/client";

export const createBugSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(5).nullable(),
    reporter_id: z.number(),
    developer_id: z.number(),
    project_id: z.number(),
    column_id: z.number(),
    order_in_column: z.number().default(1),
    status: z.nativeEnum(BugStatus),
    priority: z.nativeEnum(BugPriority),
})

export const clientCreateBugSchema = createBugSchema
    .extend({
        description: z.string().min(5).optional()
    })
    .omit({ reporter_id: true });



export type CreateBugSchema = z.infer<typeof createBugSchema>
export type ClientCreateBugSchema = z.infer<typeof clientCreateBugSchema>