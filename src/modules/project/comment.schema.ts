import {z} from "zod";

export const commentSchema = z.object({
    body: z.string().min(3),
    user_id: z.number().nonnegative(),
    bug_id: z.number().nonnegative()
})


export type CommentSchema = z.infer<typeof commentSchema>