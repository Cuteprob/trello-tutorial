import {z} from "Zod"

export const DeleteBoard = z.object({
    id: z.string(),
});