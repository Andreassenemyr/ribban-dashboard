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

interface TaskModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
};

export const TaskModal = ({
  children,
  onConfirm
}: TaskModalProps) => {
  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-700">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-700">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-slate-700 rounded-lg" onClick={e => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="text-slate-700" onClick={handleConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}