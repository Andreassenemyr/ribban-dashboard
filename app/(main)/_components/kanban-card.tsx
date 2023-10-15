'use client'

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface KanbanCardProps {
    id: string;
    index: number;
    title: string;
}

export const KanbanCard = ({
    id,
    index,
    title
}: KanbanCardProps) => {
    const [selected, setSelected] = useState(false);

    return (
        <Draggable key={index} index={index} draggableId={`${id}`}> 
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className={cn(
                        "w-full border rounded-lg p-4 cursor-pointer",
                        selected && 'rotate-[2deg]'
                    )}>
                        <h1 className="text-slate-800 font-bold text-md">{title}</h1>
                        <p className="text-sm text-gray-400 font-light py-2">It just needs to adapt the UI from what you did before.</p>
                    </div>
                </div>
            )}
        </Draggable>
    )
};
