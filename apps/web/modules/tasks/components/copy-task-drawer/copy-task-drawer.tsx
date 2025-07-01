"use client"

import * as React from "react"
import { Edit } from "davinci/icons"
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, ScrollArea } from "davinci/primitives"
import { CopyTaskForm } from "../copy-task-form"
import { Task } from "../../hooks/data/schema"
import { query } from "../../queries/tasks.query"
import { useTask } from "../../queries/use-task"
import { useCopyTask } from "../../mutations/use-copy-task"

interface CopyTaskDrawerProps {
  taskId: string
  onTaskCopied?: (task: Task) => void
  triggerLabel?: string
  triggerVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  triggerSize?: "default" | "sm" | "lg" | "icon"
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CopyTaskDrawer({ 
  taskId,
  onTaskCopied, 
  triggerLabel = "Copy Task",
  triggerVariant = "ghost",
  triggerSize = "sm",
  trigger,
  open,
  onOpenChange
}: CopyTaskDrawerProps) {
  const { data } = useTask({ variables: { taskId } });
  const [copyTask, { loading: isLoading }] = useCopyTask({
    refetchQueries: [{ query: query }],
  });
  const [_open, _setOpen] = React.useState(false)

  // Use controlled state if provided, otherwise use internal state
  const isControlled = open !== undefined && onOpenChange !== undefined
  const currentOpen = isControlled ? open : _open
  const setCurrentOpen = isControlled ? onOpenChange : _setOpen

  const handleSubmit = async (data: Omit<Task, "id">) => {
    const result = await copyTask({
      variables: {
        taskId,
        input: data,
      },
    });

    if(result.data?.copyTask) {
      
      // Call the callback with the updated task
      onTaskCopied?.(result.data?.copyTask)
      
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
            <DrawerTitle>Copy Task</DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            <CopyTaskForm 
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

