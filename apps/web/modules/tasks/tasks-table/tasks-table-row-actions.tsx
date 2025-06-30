"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "davinci/icons"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "davinci/primitives"

import { labels } from "../data/data"
import { taskSchema } from "../data/schema"
import { DeleteTaskDialog } from "../delete-task-dialog/delete-task-dialog"
import { useState } from "react"

interface TasksTableRowActionsProps<TData> {
  row: Row<TData>
}

export function TasksTableRowActions<TData>({
  row,
}: TasksTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <div>
{ isDeleteDialogOpen ?     <DeleteTaskDialog taskId={task.id} onCancel={() => setIsDeleteDialogOpen(false)} onDelete={() => setIsDeleteDialogOpen(false)} open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} />
: null}    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
