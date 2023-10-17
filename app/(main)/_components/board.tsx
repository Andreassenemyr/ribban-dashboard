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
import JSConfetti from "js-confetti"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ConfirmModal } from "@/components/modals/confirm-modal"

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
    const update = useMutation(api.projects.update);
    const getUsers = useQuery(api.users.getUsers);


    const [onlyMine, setOnlyMine] = useState(false);

    const taskList = useQuery(api.tasks.getByProject, {
        projectId: project._id,
        userId: onlyMine,
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
            const columnData = taskList?.filter((task) => task.status === columnName) || [];
            return { ...column, cards: columnData };
        });

        setColumns(updatedColumns);
    }, [taskList]);

    const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
        setCard(undefined);

        if (!destination) {
          return;
        }
        
        // If the draggable item was re-ordered within the same list (column),
        // update the order of cards in the source column
        if (source.droppableId === destination.droppableId) {
          const columnIndex = columns.findIndex((col) => col.name === source.droppableId);
          const updatedColumns = [...columns];
          const column = updatedColumns[columnIndex];
          const [movedCard] = column.cards.splice(source.index, 1);
          column.cards.splice(destination.index, 0, movedCard);

          if (column.name === 'Completed') {
            const confetti = new JSConfetti();
            confetti.addConfetti({
                emojis: ['🎉', '🥳'],
                emojiSize: 50,
                confettiNumber: 50,
              })
          }
    
          
          setStatus({ taskId: movedCard._id, status: column.name })
    
          setColumns(updatedColumns);
        } else {
          // If the draggable item was moved to a different list (column),
          // update the order of columns and move the card to the new column
          const sourceColumnIndex = columns.findIndex((col) => col.name === source.droppableId);
          const destinationColumnIndex = columns.findIndex((col) => col.name === destination.droppableId);
          const updatedColumns = [...columns];
    
          const sourceColumn = updatedColumns[sourceColumnIndex];
          const destinationColumn = updatedColumns[destinationColumnIndex];
    
          const [movedCard] = sourceColumn.cards.splice(source.index, 1);
          destinationColumn.cards.splice(destination.index, 0, movedCard);

          setStatus({ taskId: movedCard._id, status: destinationColumn.name })

          if (destinationColumn.name === 'Completed') {
            const confetti = new JSConfetti();
            confetti.addConfetti({
                emojis: ['🥳', '🎉'],
                emojiSize: 50,
                confettiNumber: 50,
              })
          }
    
    
          setColumns(updatedColumns);
        }
    }

    const allUsers = getUsers?.map((user) => user.userId) || [];


    return (
        <>
            <div className="flex justify-between">
                <div>
                    <Breadcrumb positions={[
                        { name: 'Workspace', href: '/projects' },
                        { name: project.title,  href: `/projects/${project._id}`},
                        { name: 'Board', href: `/projects/${project._id}/board`}
                    ]}/>
                    <h1 className="text-slate-800 text-5xl font-bold py-4">{project.title}</h1>
                    <Button 
                        variant='outline'
                        className={cn("text-slate-800 my-4 rounded-md font-semibold border border-gray-300 text-md gap-3", onlyMine && 'bg-gray-100')}
                        onClick={() => setOnlyMine(!onlyMine)}
                    >
                        Bara Mina
                    </Button>
                </div>
                <div className="flex gap-3">
                    <Button variant='outline' className="text-slate-800 rounded-lg font-semibold border-[1.5px] border-[#E2E8F0] text-md px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M5.07501 11.0667H7.65001V17.0667C7.65001 18.4667 8.40835 18.75 9.33335 17.7L15.6417 10.5333C16.4167 9.65832 16.0917 8.93332 14.9167 8.93332H12.3417V2.93332C12.3417 1.53332 11.5833 1.24999 10.6583 2.29999L4.35001 9.46665C3.58335 10.35 3.90835 11.0667 5.07501 11.0667Z" stroke="#1E293B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                    <Button variant='outline' className="text-slate-800 rounded-lg font-semibold border-[1.5px] border-[#E2E8F0] text-md px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M10.2975 2.63251L11.6175 5.27251C11.7975 5.64001 12.2775 5.99251 12.6825 6.06001L15.075 6.45751C16.605 6.71251 16.965 7.82251 15.8625 8.91751L14.0025 10.7775C13.6875 11.0925 13.515 11.7 13.6125 12.135L14.145 14.4375C14.565 16.26 13.5975 16.965 11.985 16.0125L9.74249 14.685C9.33749 14.445 8.66999 14.445 8.25749 14.685L6.01499 16.0125C4.40999 16.965 3.43499 16.2525 3.85499 14.4375L4.38749 12.135C4.48499 11.7 4.31249 11.0925 3.99749 10.7775L2.13749 8.91751C1.04249 7.82251 1.39499 6.71251 2.92499 6.45751L5.31749 6.06001C5.71499 5.99251 6.19499 5.64001 6.37499 5.27251L7.69499 2.63251C8.41499 1.20001 9.58499 1.20001 10.2975 2.63251Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                    <Button variant='outline' className="text-slate-800 rounded-md font-semibold border border-gray-300 text-md gap-3" onClick={() => update({ id: project._id, userId: [...allUsers]})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.63332 9.05832C7.54999 9.04999 7.44999 9.04999 7.35832 9.05832C5.37499 8.99166 3.79999 7.36666 3.79999 5.36666C3.79999 3.32499 5.44999 1.66666 7.49999 1.66666C9.54166 1.66666 11.2 3.32499 11.2 5.36666C11.1917 7.36666 9.61666 8.99166 7.63332 9.05832Z" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.675 3.33334C15.2916 3.33334 16.5917 4.64168 16.5917 6.25001C16.5917 7.82501 15.3417 9.10834 13.7833 9.16668C13.7167 9.15834 13.6417 9.15834 13.5667 9.16668" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.46666 12.1333C1.45 13.4833 1.45 15.6833 3.46666 17.025C5.75833 18.5583 9.51666 18.5583 11.8083 17.025C13.825 15.675 13.825 13.475 11.8083 12.1333C9.525 10.6083 5.76666 10.6083 3.46666 12.1333Z" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.2833 16.6667C15.8833 16.5417 16.45 16.3 16.9167 15.9417C18.2167 14.9667 18.2167 13.3583 16.9167 12.3833C16.4583 12.0333 15.9 11.8 15.3083 11.6667" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Dela
                    </Button>
                </div>
            </div>
            <DragDropContext onDragStart={(result) => setCard(result.draggableId as Id<'tasks'>)} onDragEnd={(result) => onDragEnd(result)}>
                <div className="flex gap-12 py-6">
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
            <ConfirmModal onConfirm={() => console.log('Confirmed')}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-slate-700 w-max"
                >
                  Hej
                </div>
            </ConfirmModal>
        </>
    )
}