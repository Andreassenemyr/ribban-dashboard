'use client'

import { CalenderIcon } from "@/components/icons/calender-icon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface KanbanCardProps {
    id: string;
    index: number;
    title: string;
    selected: boolean;
    assignedTo: string[],
    tags: string[],
    deadline?: number | undefined;
    isFinished?: boolean;
}

export const KanbanCard = ({
    id,
    index,
    title,
    selected,
    assignedTo,
    tags,
    deadline,
    isFinished = true,
}: KanbanCardProps) => {
    return (
        <Draggable key={index} index={index} draggableId={`${id}`}> 
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="pb-3 bg-white">
                    <div className={cn(
                        "w-full border rounded-lg cursor-pointer transition-all duration-400",
                        selected && 'rotate-[4deg]'
                    )}>
                        <div className="p-4">
                            <h1 className="text-slate-800 font-bold text-md">{title}</h1>
                            <p className="text-sm text-gray-400 font-light py-2">It just needs to adapt the UI from what you did before.</p>
                            <div className="flex pt-2">
                                <div className="bg-cyan-50 text-blue-400 font-medium p-1 rounded-md text-sm">Development</div>
                            </div>
                        </div>
                        <div className="flex justify-between border-y mb-[3px] text-slate-800 p-4">
                            <div className="flex text-gray-400 text-sm gap-1 font-medium">
                                <Image alt='Kommentarer' src='/Chat.svg' width={20} height={20} />
                                0
                            </div>
                            {isFinished ? (
                                <div className="flex items-center font-medium text-sm gap-1 text-[#78C552]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M5.83337 9.99999L10 14.1667L18.3334 5.83332" stroke="#78C552" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10 9.99999L14.1667 5.83332M1.66669 9.99999L5.83335 14.1667L1.66669 9.99999Z" stroke="#78C552" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Färdig
                                </div>
                            ) : (deadline !== undefined) && (
                                <div className="flex items-center font-medium text-sm text-gray-400 gap-2">
                                    <CalenderIcon/>
                                    Imorgon ({Math.round((deadline - (new Date()).getTime()) / 1000 / 60 / 60)}h)
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
            )}
        </Draggable>
    )
};
