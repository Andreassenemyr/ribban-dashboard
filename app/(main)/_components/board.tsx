'use client'

import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Breadcrumb } from "./breadcrumb"
import { PlusIcon } from "@/components/icons/plus-icon"
import { Column } from "./column"
import { useMutation, useQuery } from "convex/react"
import { useParams } from "next/navigation"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useEffect, useState } from "react"

interface BoardProps {
    project: Doc<'projects'>;
    initialData?: Doc<'tasks'>[];
}

export const Board = ({
    project,
    initialData,
}: BoardProps) => {
    const create = useMutation(api.tasks.create);
    const setStatus = useMutation(api.tasks.setStatus);

    const taskList = useQuery(api.tasks.getByProject, {
        projectId: project._id,
    });

    const [card, setCard] = useState<Id<'tasks'>>();
    const [columns, setColumns] = useState<{ name: string, color: string, cards: Doc<'tasks'>[]}[]>([
        { name: 'Todo', color: '#000000', cards: [] },
        { name: 'In Work', color: '#306BFF', cards: [] },
        { name: 'QA', color: '#FFB580', cards: [] },
        { name: 'Completed', color: '#78C552', cards: [] },
    ]);    

    useEffect(() => {
        // Create a copy of the initialData to avoid mutating props directly.
        const updatedColumns = columns.map(column => {
            const columnName = column.name;
            const columnData = taskList?.filter(task => task.status === columnName) || [];
            return { ...column, cards: columnData };
        });

        setColumns(updatedColumns);
    }, [taskList]);

    const onDragEnd = (result: DropResult) => {
        
      };

    const getCardsForColumn = (columnName: string) => {
        const column = columns.find(col => col.name === columnName);
        return column ? column.cards : [];
    };


    return (
        <>
            <Breadcrumb positions={[
                { name: 'Workspace', href: '/projects' },
                { name: project.title,  href: `/projects/${project._id}`},
                { name: 'Board', href: `/projects/${project._id}/board`}
            ]}/>
            <h1 className="text-slate-800 text-5xl font-bold py-4">{project.title}</h1>
            <DragDropContext onDragStart={(result) => setCard(result.draggableId as Id<'tasks'>)} onDragEnd={(result) => onDragEnd(result)}>
                <div className="flex gap-12">
                    {columns.map((column, index) => (
                        <Column
                            key={index}
                            title={column.name}
                            color={column.color}
                            project={project._id}
                            selectedCard={card}
                            cards={column.cards}
                        />
                    ))}
                </div>
            </DragDropContext>
            <div className="fixed flex cursor-pointer items-center gap-2 bottom-0 m-12 right-0 px-8 py-4 font-semibold text-md bg-blue-700 rounded-full" onClick={() => create({ title: "Untitled", projectId: project._id, deadline: (new Date()).getTime() + (1000 * 60 * 60 * 24) })}>
                <PlusIcon fill='white'/>
                Ny Task
            </div>
        </>
    )
}