"use client";

import { ListWithCards } from "@/types";
import { useState } from "react";
import ListForm from "./list-form";

interface ListContainerProps{
    data: ListWithCards[];
    boardId: string;
}
const ListContainer = ({
    data,
    boardId,
}:ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);

    return ( 
        <ol>
            <ListForm/>
        </ol>
     );
}
 
export default ListContainer;