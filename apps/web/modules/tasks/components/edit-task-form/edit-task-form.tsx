"use client"

import * as React from "react"
import { z } from "zod"

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "davinci/primitives"

import { ProjectSelect } from "../../../project"
import { priorities, statuses } from "../../hooks/data/data"
import { taskSchema } from "../../hooks/data/schema"
import { TeamMemberSelect } from "../../../team/team-member-select"
import { useTask } from "../../hooks/use-tasks"

// Create a schema for the form (without id since it will be generated)
const addTaskSchema = taskSchema.omit({ id: true })

type EditTaskFormValues = z.infer<typeof addTaskSchema>

interface EditTaskFormProps {
  taskId: string
  onSubmit?: (data: EditTaskFormValues) => void
  onCancel?: () => void
  isLoading?: boolean
}

export function EditTaskForm({ taskId, onSubmit, onCancel, isLoading = false }: EditTaskFormProps) {
  const task = useTask(taskId)
  const [formData, setFormData] = React.useState<EditTaskFormValues>({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "todo",
    label: task?.label ?? "feature",
    priority: "medium",
    projectId: undefined,
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const handleInputChange = (field: keyof EditTaskFormValues, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleProjectSelect = (projectId: string | null) => {
    setFormData(prev => ({ ...prev, projectId: projectId || undefined }))
    // Clear error when user selects a project
    if (errors.projectId) {
      setErrors(prev => ({ ...prev, projectId: "" }))
    }
  }

  const handleAssigneeSelect = (assigneeId: string | null) => {
    setFormData(prev => ({ ...prev, assigneeId: assigneeId || undefined }))
    // Clear error when user selects a team member
    if (errors.assigneeId) {
      setErrors(prev => ({ ...prev, assigneeId: "" }))
    }
  }

  const validateForm = (): boolean => {
    try {
      addTaskSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit?.(formData)
    }
  }

  return (
        <form onSubmit={handleSubmit} className="h-full w-full">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
            <p className="text-xs text-muted-foreground">
              A clear and descriptive title for the task.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter task description..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={errors.description ? "border-destructive" : ""}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Detailed description of the task (optional).
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger className={errors.status ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center">
                      {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive">{errors.status}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Current status of the task.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="project" className="text-sm font-medium">
              Project
            </label>
            <div className={errors.projectId ? "border border-destructive rounded-md" : ""}>
              <ProjectSelect
                onSelect={handleProjectSelect}
                selectedId={formData.projectId}
              />
            </div>
            {errors.projectId && (
              <p className="text-sm text-destructive">{errors.projectId}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Select the project this task belongs to.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="project" className="text-sm font-medium">
              Assignee
            </label>
            <div className={errors.projectId ? "border border-destructive rounded-md" : ""}>
              <TeamMemberSelect
                onSelect={handleAssigneeSelect}
                selectedId={formData.assigneeId ?? null}
              />
            </div>
            {errors.assigneeId && (
              <p className="text-sm text-destructive">{errors.assigneeId}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Select the team member responsible for this task.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium">
              Priority
            </label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
              <SelectTrigger className={errors.priority ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center">
                      {priority.icon && (
                        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      {priority.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm text-destructive">{errors.priority}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Priority level of the task.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isLoading} variant="default" size="sm">
              {isLoading ? "Updating..." : "Update Task"}
            </Button>
          </div>
        </form>
  )
}
