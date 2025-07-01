"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from 'next/image';

import { Badge, Checkbox } from "davinci/primitives"

import { priorities, statuses } from "../../hooks/data/data"
import { TasksTableColumnHeader } from "./tasks-table-column-header"
import { TasksTableRowActions } from "./tasks-table-row-actions"
import { Task } from "../../../../graphql"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TasksTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 row-span-2">
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("title")}
          </span>
          <Badge variant="outline">{row.original.project?.title}</Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => (
      <TasksTableColumnHeader column={column} title="Assignee" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
        <Image 
            src={row.original.assignee?.avatar} 
            alt={row.original.assignee?.name}
            width={24}
            height={24}
            className="rounded-full"
        />
        <span className="font-medium">{row.original.assignee?.name}</span>
    </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <TasksTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.description}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TasksTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <TasksTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TasksTableRowActions row={row} />,
  },
]