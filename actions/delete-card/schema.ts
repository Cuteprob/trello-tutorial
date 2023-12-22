import {z} from "Zod"

export const DeleteCard = z.object({
    id: z.string(),
    boardId: z.string(),
});