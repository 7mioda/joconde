"use client"

import * as React from "react"
import { z } from "zod"
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik"

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

// Create a schema for the form (without id since it will be generated)
const addTaskSchema = taskSchema.omit({ id: true })

type CopyTaskFormValues = z.infer<typeof addTaskSchema>

interface CopyTaskFormProps {
  initialData?: CopyTaskFormValues;
  onSubmit?: (data: CopyTaskFormValues) => void
  onCancel?: () => void
  isLoading?: boolean
}

export function CopyTaskForm({ initialData, onSubmit, onCancel, isLoading = false }: CopyTaskFormProps) {
  const initialValues: CopyTaskFormValues = {
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    status: initialData?.status ?? "TODO",
    label: initialData?.label ?? "FEATURE",
    priority: initialData?.priority ?? "MEDIUM",
    projectId: initialData?.projectId ?? undefined,
    assigneeId: initialData?.assigneeId ?? undefined,
  }

  const validateForm = (values: CopyTaskFormValues) => {
    try {
      addTaskSchema.parse(values)
      return {}
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        return errors
      }
      return {}
    }
  }

  const handleSubmit = (values: CopyTaskFormValues) => {
    onSubmit?.(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, setFieldValue, errors, touched }: FormikProps<CopyTaskFormValues>) => (
        <Form className="h-full w-full">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Field
              as={Input}
              id="title"
              name="title"
              placeholder="Enter task title..."
              className={errors.title && touched.title ? "border-destructive" : ""}
            />
            <ErrorMessage name="title" component="p" className="text-sm text-destructive" />
            <p className="text-xs text-muted-foreground">
              A clear and descriptive title for the task.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Field
              as={Textarea}
              id="description"
              name="description"
              placeholder="Enter task description..."
              className={errors.description && touched.description ? "border-destructive" : ""}
              rows={4}
            />
            <ErrorMessage name="description" component="p" className="text-sm text-destructive" />
            <p className="text-xs text-muted-foreground">
              Detailed description of the task (optional).
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select 
              value={values.status} 
              onValueChange={(value) => setFieldValue("status", value)}
            >
              <SelectTrigger className={errors.status && touched.status ? "border-destructive" : ""}>
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
            <ErrorMessage name="status" component="p" className="text-sm text-destructive" />
            <p className="text-xs text-muted-foreground">
              Current status of the task.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="project" className="text-sm font-medium">
              Project
            </label>
            <div className={errors.projectId && touched.projectId ? "border border-destructive rounded-md" : ""}>
              <ProjectSelect
                onSelect={(projectId) => setFieldValue("projectId", projectId || undefined)}
                selectedId={values.projectId}
              />
            </div>
            <ErrorMessage name="projectId" component="p" className="text-sm text-destructive" />
            <p className="text-xs text-muted-foreground">
              Select the project this task belongs to.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="assignee" className="text-sm font-medium">
              Assignee
            </label>
            <div className={errors.assigneeId && touched.assigneeId ? "border border-destructive rounded-md" : ""}>
              <TeamMemberSelect
                onSelect={(assigneeId) => setFieldValue("assigneeId", assigneeId || undefined)}
                selectedId={values.assigneeId ?? null}
              />
            </div>
            <ErrorMessage name="assigneeId" component="p" className="text-sm text-destructive" />
            <p className="text-xs text-muted-foreground">
              Select the team member responsible for this task.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium">
              Priority
            </label>
            <Select 
              value={values.priority} 
              onValueChange={(value) => setFieldValue("priority", value)}
            >
              <SelectTrigger className={errors.priority && touched.priority ? "border-destructive" : ""}>
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
            <ErrorMessage name="priority" component="p" className="text-sm text-destructive" />
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
              {isLoading ? "Copying..." : "Copy Task"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
