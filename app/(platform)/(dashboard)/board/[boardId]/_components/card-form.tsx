"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing: ()=>void;
    disableEditing: ()=>void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    enableEditing,
    isEditing,
    disableEditing,
},ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const {execute, fieldErrors} = useAction(createCard,{
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" is created`);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const onkeyDown = (e: KeyboardEvent) => {
        if(e.key === "Escape") {
            disableEditing();
        }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown",onkeyDown);

    const onTextareaDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if(e.key === "Enter" && ! e.shiftKey){
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = params.boardId as string;

        execute({title, listId, boardId});
    }
 

    if( isEditing) {
        return(
            <form
                ref={formRef}
                action={onSubmit}
                className="m-1 py-0.5 px-1 space-y-4"
            >
                <FormTextarea
                    id="title"
                    onKeyDown={onTextareaDown}
                    ref={ref}
                    placeholder="Enter a title for this card..."
                    errors={fieldErrors}
                />
                <input 
                    hidden
                    id="listId"
                    name="listId"
                    value={listId}
                />
                <div>
                    <FormSubmit>
                        Add card
                    </FormSubmit>
                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className="h-5 w-5"/>
                    </Button>
                </div>
            </form>
        )
    }

    return(
        <div>
            <Button
                onClick={enableEditing}
                className="h-auto w-full py-1.5 justify-start text-muted-foreground text-sm "
                variant="ghost"
                size="sm"
            >
                <Plus className="h-4 w-4 mr-2"/>
                Add a card
            </Button>
        </div>
    )
})

CardForm.displayName = "CardForm";