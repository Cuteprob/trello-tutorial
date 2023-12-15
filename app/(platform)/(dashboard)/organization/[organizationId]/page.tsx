import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Board from "./board";
import Form from "./form";


const OrganizationIdPage = async () => {
   const baords = await db.board.findMany();

    return ( 
        <div>
            <Form/>
            <div className="space-y-2">
                {baords.map ((board) => (
                    <Board key={board.id} id={board.id} title={board.title}/>
                ))}
            </div>
        </div>
     );
}
 
export default OrganizationIdPage;