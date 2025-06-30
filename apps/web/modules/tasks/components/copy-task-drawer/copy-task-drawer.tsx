"use client"

import * as React from "react"
import { Edit } from "davinci/icons"
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, ScrollArea } from "davinci/primitives"
import { CopyTaskForm } from "../copy-task-form"
import { Task } from "../../hooks/data/schema"

interface CopyTaskDrawerProps {
  taskId: string
  onTaskUpdated?: (task: Task) => void
  triggerLabel?: string
  triggerVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  triggerSize?: "default" | "sm" | "lg" | "icon"
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CopyTaskDrawer({ 
  taskId,
  onTaskUpdated, 
  triggerLabel = "Copy Task",
  triggerVariant = "ghost",
  triggerSize = "sm",
  trigger,
  open,
  onOpenChange
}: CopyTaskDrawerProps) {
  const [_open, _setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // Use controlled state if provided, otherwise use internal state
  const isControlled = open !== undefined && onOpenChange !== undefined
  const currentOpen = isControlled ? open : _open
  const setCurrentOpen = isControlled ? onOpenChange : _setOpen

  const handleSubmit = async (data: Omit<Task, "id">) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create updated task with existing ID
      const updatedTask: Task = {
        ...data,
        id: taskId,
      }
      
      // Call the callback with the updated task
      onTaskUpdated?.(updatedTask)
      
      // Close the drawer
      setCurrentOpen(false)
      
      // You would typically update your database here
      console.log("Task updated:", updatedTask)
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setIsLoading(false)
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
              taskId={taskId}
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

