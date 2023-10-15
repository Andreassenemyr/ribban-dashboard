'use client'

import { Breadcrumb } from "@/app/(main)/_components/breadcrumb";
import { Column } from "@/app/(main)/_components/column";
import { PlusIcon } from "@/components/icons/plus-icon";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const BoardPage = () => {
    const params = useParams();
    const create = useMutation(api.tasks.create);
    const setStatus = useMutation(api.tasks.setStatus);

    const project = useQuery(api.projects.getById, {
        projectId: params.projectId as Id<'projects'>,
    });
    
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return; 
        
        console.log(result);

        setStatus({ taskId: result.draggableId as Id<'tasks'>, status: result.destination.droppableId })
    };
    
    if (project === undefined) {
        return (
          <div>
            Laddar
          </div>
        );
      }
    
      if (project === null) {
        return <div>Not found</div>
      }


    return (
        <div className="p-12">
            <Breadcrumb positions={[
                { name: 'Workspace', href: '/projects' },
                { name: project.title,  href: `/projects/${project._id}`},
                { name: 'Board', href: `/projects/${project._id}/board`}
            ]}/>
            <h1 className="text-slate-800 text-5xl font-bold py-4">{project.title}</h1>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <div className="flex gap-12">
                    <Column
                        title="Todo"
                        color="#000000"
                        project={project._id}
                        tasks={project.tasks}
                    />
                    <Column
                        title="In Work"
                        color="#306BFF"
                        project={project._id}
                        tasks={project.tasks}
                    />
                    <Column
                        title="QA"
                        color="#FFB580"
                        project={project._id}
                        tasks={project.tasks}
                    />
                    <Column
                        title="Completed"
                        color="#78C552"
                        project={project._id}
                        tasks={project.tasks}
                    />
                </div>
            </DragDropContext>
            <div className="absolute flex cursor-pointer items-center gap-2 bottom-0 m-12 right-0 px-8 py-4 font-semibold text-md bg-blue-700 rounded-full" onClick={() => create({ title: "Untitled", projectId: project._id })}>
                <PlusIcon fill='white'/>
                Ny Task
            </div>
        </div>
    )
};

export default BoardPage;