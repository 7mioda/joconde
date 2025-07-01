"use client"

import * as React from "react"
import { Edit } from "davinci/icons"
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, ScrollArea } from "davinci/primitives"
import { EditTaskForm } from "../edit-task-form"
import { Task } from "../../hooks/data/schema"
import { useUpdateTask } from "../../mutations/use-edit-task"
import { query } from "../../queries/tasks.query"
import { useTask } from "../../queries/use-task"

interface EditTaskDrawerProps {
  taskId: string
  onTaskUpdated?: (task: Task) => void
  triggerLabel?: string
  triggerVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  triggerSize?: "default" | "sm" | "lg" | "icon"
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditTaskDrawer({ 
  taskId,
  onTaskUpdated, 
  triggerLabel = "Edit Task",
  triggerVariant = "ghost",
  triggerSize = "sm",
  trigger,
  open,
  onOpenChange
}: EditTaskDrawerProps) {
  const { data } = useTask({ variables: { taskId } });
  const [updateTask, { loading: isLoading }] = useUpdateTask({
    refetchQueries: [{ query: query }],
  });
  const [_open, _setOpen] = React.useState(false)

  // Use controlled state if provided, otherwise use internal state
  const isControlled = open !== undefined && onOpenChange !== undefined
  const currentOpen = isControlled ? open : _open
  const setCurrentOpen = isControlled ? onOpenChange : _setOpen

  const handleSubmit = async (data: Omit<Task, "id">) => {
    const result = await updateTask({
      variables: {
        updateTaskId: taskId,
        input: data,
      },
    });

    if(result.data?.updateTask) {
      
      // Create updated task with existing ID
      const updatedTask: Task = {
        ...data,
        id: taskId,
      }
      
      // Call the callback with the updated task
      onTaskUpdated?.(updatedTask)
      
      // Close the drawer
      setCurrentOpen(false)
    }
  }

  const handleCancel = () => {
    setCurrentOpen(false)
  }

  return (
    <Drawer open={currentOpen} onOpenChange={setCurrentOpen}>
      <DrawerTrigger asChild>
        {trigger || (
          <Button variant={triggerVariant} size={triggerSize}>
            <Edit className="h-4 w-4" />
            {triggerLabel}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="h-full w-full">
        <ScrollArea className="flex-1 overflow-y-auto h-72 w-full p-6">
          <DrawerHeader>
            <DrawerTitle>Edit Task</DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            <EditTaskForm 
              initialData={data?.task}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

