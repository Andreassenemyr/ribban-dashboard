'use client';

import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation"
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

interface ProjectListProps {
    level: number;
}

export const ProjectList = ({
    level = 0,
}) => {
    const params = useParams();
    const router = useRouter();

    const projects = useQuery(api.projects.getSidebar, {});
    
    const onRedirect = (documentId: string) => {
        router.push(`/projects/${documentId}`);
    };

    if (projects === undefined) {
        return (
            <div className='font-semibold text-slate-700'>
                Laddar
            </div>
        )
    };
    

    return (
        <div className="flex flex-col py-4 gap-y-2">
            {projects.map((project, index) => {
                const isActive = project._id === params.projectId;

                return (
                    <div key={project._id} onClick={() => onRedirect(project._id)} className={cn(
                        "flex items-center gap-x-5 py-2 px-2 rounded-md cursor-pointer",
                        isActive && 'bg-gray-100 font-semibold'
                    )}>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color + '1'}}/>
                        <h1 className="text-slate-700 text-lg">{project.title}</h1>
                    </div>
                )
            })}
        </div>
    )
}