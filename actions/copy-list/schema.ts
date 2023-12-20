import {z} from "Zod"

export const CopyList = z.object({
   id: z.string(),
   boardId: z.string(),
});