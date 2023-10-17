'use client'

import { Board } from "@/app/(main)/_components/board";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

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