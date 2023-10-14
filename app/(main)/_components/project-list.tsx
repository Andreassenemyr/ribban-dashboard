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

    if (projects === undefined) {
        return (
            <div className='font-semibold text-slate-700'>
                Laddar
            </div>
        )
    };

    return (
        <div className="flex flex-col py-4 gap-y-2">
            {projects.map((project, index) => (
                <div key={project._id} className="flex bg-gray-100 items-center gap-x-5 py-2 px-2 rounded-md cursor-pointer">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color}}/>
                    <h1 className="text-slate-700 font-semibold text-lg">{project.title}</h1>
                </div>
            ))}
        </div>
    )
}