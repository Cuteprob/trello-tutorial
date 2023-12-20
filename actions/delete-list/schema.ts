import {z} from "Zod"

export const DeleteList = z.object({
    id: z.string(),
    boardId: z.string(),
});