"use client";

import { CardModal } from "@/components/modals/card-modal";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export const ModalProvider = ()=>{
    const queryClient = new QueryClient();

    return (
        <>
        <QueryClientProvider client={queryClient}>
            <CardModal />
        </QueryClientProvider>
        </>
    )
}