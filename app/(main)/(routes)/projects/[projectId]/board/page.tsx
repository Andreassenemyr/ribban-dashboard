'use client'

import { Board } from "@/app/(main)/_components/board";
import { Breadcrumb } from "@/app/(main)/_components/breadcrumb";
import { Column } from "@/app/(main)/_components/column";
import { PlusIcon } from "@/components/icons/plus-icon";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface ColumnData {
    [key: string]: Array<Doc<'tasks'>>;
}

const Columns = ['Todo', 'In Work', 'QA', 'Completed'];

const BoardPage = () => {
    const params = useParams();
    const project = useQuery(api.projects.getById, {
        projectId: params.projectId as Id<'projects'>,
    });

    

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
        <div className="p-12 bg-white ">
            <Board project={project}/>
        </div>
    )
};

export default BoardPage;