"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Doc } from "@/convex/_generated/dataModel";
import { Title } from "../title";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface TaskModalProps {
  children: React.ReactNode;
  task: Doc<'tasks'>;
};

export const TaskModal = ({
    children,
    task
}: TaskModalProps) => {
  const update = useMutation(api.tasks.update);

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="py-2 text-slate-700">
            <div className="flex flex-col">
              <Title
                initialData={task.title}
                onUpdate={(title) => {
                  update({ id: task._id, title: title || 'Untitled' });
                }}
              />
              <h1 className="text-gray-400 px-1 font-normal text-sm">Under {task.status}</h1>
            </div>
            
          </AlertDialogTitle>
          <div className="w-full bg-gray-200 h-[1px]"></div>
          <AlertDialogDescription className="py-2 text-slate-700 px-1">
            <h1 className="font-medium py-2">Beskrivning</h1>
            <Input/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white rounded-lg w-full bg-gray-800" onClick={e => e.stopPropagation()}>
            Stäng
          </AlertDialogCancel>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}