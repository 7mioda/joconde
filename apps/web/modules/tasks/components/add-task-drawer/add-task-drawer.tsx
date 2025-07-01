"use client"

import * as React from "react"
import { Plus } from "davinci/icons"
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, ScrollArea } from "davinci/primitives"
import { AddTaskForm } from "../add-task-form"
import { Task } from "../../hooks/data/schema"
import { useCreateTask } from "../../mutations/use-create-task"
import { query } from "../../queries/tasks.query"

interface AddTaskDrawerProps {
  onTaskAdded?: (task: Task) => void
  triggerLabel?: string
  triggerVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  triggerSize?: "default" | "sm" | "lg" | "icon"
}

export function AddTaskDrawer({ 
  onTaskAdded, 
  triggerLabel = "Add Task",
  triggerVariant = "default",
  triggerSize = "sm"
}: AddTaskDrawerProps) {
  const [open, setOpen] = React.useState(false)

  const [createTask, { loading: isLoading }] = useCreateTask({
    refetchQueries: [{ query: query }],
  });

  const handleSubmit = async (data: Omit<Task, "id">) => {
      const result = await createTask({
        variables: {
          input: data,
        },
      });
      const task = result.data?.createTask;

      if(!task) {
        return;
      }
      
      // Call the callback with the new task
      onTaskAdded?.(task)
      
      // Close the drawer
      setOpen(false)
      
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={triggerVariant}  className="ml-auto hidden h-8 lg:flex" size={triggerSize}>
          <Plus className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full">
      <ScrollArea className="flex-1 overflow-y-auto h-72 w-full p-6">
        <DrawerHeader>
          <DrawerTitle>Add New Task</DrawerTitle>
        </DrawerHeader>
          <div className="p-6">
            <AddTaskForm 
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

