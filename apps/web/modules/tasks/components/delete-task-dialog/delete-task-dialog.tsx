"use client"

import * as React from "react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "davinci/primitives"
import { useDeleteTask } from "../../mutations/use-delete-task"
import { query } from "../../queries/tasks.query"

interface DeleteTaskDialogProps {
  taskId: string
  onDelete?: (taskId: string) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onCancel?: () => void;
  trigger?: React.ReactNode
}

export function DeleteTaskDialog({ taskId, onDelete, open, onOpenChange, onCancel, trigger }: DeleteTaskDialogProps) {
  const [confirmationText, setConfirmationText] = React.useState("")
  const [deleteTask, { loading: isDeleting }] = useDeleteTask({
    refetchQueries: [{ query: query }],
  });

  const handleDelete = async () => {
    if (confirmationText !== "delete task") {
      return
    }

    const result = await deleteTask({
      variables: {
        deleteTaskId: taskId,
      },
    });

    if(result.data?.deleteTask.success) {
      onDelete?.(taskId)
      setConfirmationText("")
    }
  }

  const handleCancel = () => {
    onCancel?.()
    setConfirmationText("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
      {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the task.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="confirmation" className="text-sm font-medium">
              Type "delete task" to confirm
            </label>
            <Input
              id="confirmation"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="delete task"
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={confirmationText !== "delete task" || isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}