'use client'

import { Droppable } from "react-beautiful-dnd"
import { KanbanCard } from "./kanban-card"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"

interface ColumnProps {
    title: string,
    color: string,
    project: Id<'projects'>,
    tasks: Id<'tasks'>[]
}

export const Column = ({
    title,
    project,
    color,
}: ColumnProps) => {
    const taskList = useQuery(api.tasks.getByStatus, {
        projectId: project,
        status: title
    });
    
    return (
        <div className="w-full">
            <div className="flex gap-4 items-center">
                <h1 className="font-semibold text-slate-700 text-sm py-3">{title.toUpperCase()}</h1>
                <div className="text-gray-400 text-sm rounded-xl border h-max px-3 ">2</div>
            </div>
            <div className="h-[1.5px] w-full" style={{ backgroundColor: color }}/>
            <Droppable droppableId={title}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} >
                        {taskList?.map((task, index) => (
                            <KanbanCard id={task._id} index={index} key={task._id} title={task.title}/>
                        ))}
                        {provided.placeholder}
                    </div>
                    
                )}
            </Droppable>
        </div>
    )
}