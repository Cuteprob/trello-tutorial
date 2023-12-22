import {z} from "Zod"

export const CopyCard = z.object({
   id: z.string(),
   boardId: z.string(),
});