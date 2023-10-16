'use client'

import { Droppable } from "react-beautiful-dnd"
import { KanbanCard } from "./kanban-card"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"
import { Cinzel } from "next/font/google"

interface ColumnProps {
    title: string,
    color: string,
    project: Id<'projects'>,
    selectedCard: Id<'tasks'> | undefined,
    cards: Doc<'tasks'>[],
}

export const Column = ({
    title,
    project,
    color,
    selectedCard,
    cards,
}: ColumnProps) => {
    const taskList = useQuery(api.tasks.getByProject, {
        projectId: project,
    });
    
    return (
        <div className="w-full">
            <div className="flex gap-4 items-center">
                <h1 className="font-semibold text-slate-700 text-sm py-3">{title.toUpperCase()}</h1>
                <div className="text-gray-400 text-sm rounded-xl border h-max px-3 ">{taskList?.length}</div>
            </div>
            <div className="h-[1.5px] w-full" style={{ backgroundColor: color }}/>
            <Droppable droppableId={title}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="py-6">
                        {cards.map((task, index) => (
                            <KanbanCard 
                                id={task._id} 
                                index={index} 
                                key={task._id} 
                                title={task.title} 
                                assignedTo={task.assignedTo}
                                tags={task.tags}
                                deadline={task.deadline}
                                selected={selectedCard === task._id}
                                isFinished={title === 'Completed'}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}