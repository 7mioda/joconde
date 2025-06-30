"use client"

import * as React from "react"
import { Trash2 } from "davinci/icons"
import {
  Button,
} from "davinci/primitives"
import { DeleteTaskDialog } from "../delete-task-dialog/delete-task-dialog"

interface DeleteTaskButtonProps {
  taskId: string
  onDelete?: (taskId: string) => void
  anchor?: React.ReactNode
}

export function DeleteTaskButton({ taskId, onDelete, anchor }: DeleteTaskButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)


  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <DeleteTaskDialog onCancel={handleCancel} onDelete={onDelete} taskId={taskId} open={isOpen} onOpenChange={setIsOpen} trigger={
      <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete Task</span>
            </Button>
    }>    
    </DeleteTaskDialog>
  )
}