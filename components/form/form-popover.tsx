"use client";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";



interface FormPopoverProps{
    children: React.ReactNode,
    side?: "left" | "right" | "top" | "bottom",
    align?: "start" | "center" | "end",
    sideOffset?: number;
};

export const FormPopover = ({
    children,
    side="bottom",
    align,
    sideOffset=0,
}: FormPopoverProps) =>{
    const router = useRouter();
    // create 成功后，popover 自动关闭
    const closeRef = useRef<ElementRef<"button">>(null)

    const {execute, fieldErrors} = useAction(createBoard,{
        onSuccess: (data) =>{
            toast.success("Board created!")
            closeRef.current?.click();
            // board Create成功后，自动进入到对应 board 页面
            router.push(`/board/${data.id}`);
        },
        onError: (error) =>{
            toast.error(error);
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        console.log({title,image})
        execute({title,image});
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="test-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button 
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker
                            errors={fieldErrors}
                            id="image"
                        />
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}