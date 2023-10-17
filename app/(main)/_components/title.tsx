"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleProps {
    initialData: string;
    onUpdate: (title: string) => void;
};

export const Title = ({
    initialData,
    onUpdate
}: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState(initialData || "Untitled");
    const [isEditing, setIsEditing] = useState(false);

    const enableInput = () => {
        setTitle(initialData);
        setIsEditing(true);
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(event.target.value);
        onUpdate(event.target.value);
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            disableInput();
        }
    };

  return (
    <div className="flex items-center gap-x-1 text-slate-700">
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 text-xl py-4 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal font-semibold text-slate-700 h-auto p-1 text-xl"
        >
          <span className="truncate">
            {title}
          </span>
        </Button>
      )}
    </div>
  )
}

