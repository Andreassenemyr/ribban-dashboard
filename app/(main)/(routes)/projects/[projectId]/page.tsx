'use client'

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { useQuery } from "convex/react";

interface ProjectIdPageProps {
    params: {
        projectId: Id<"projects">;
    }
}

const ProjectIdPage = ({
    params
}: ProjectIdPageProps) => {
    const project = useQuery(api.projects.getById, {
        projectId: params.projectId,
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
        <>
            {project?.title}
        </>
    );
};

export default ProjectIdPage;