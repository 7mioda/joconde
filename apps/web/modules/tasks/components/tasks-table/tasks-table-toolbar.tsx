"use client"

import { Table } from "@tanstack/react-table"
import { X } from "davinci/icons"

import { Button, Input } from "davinci/primitives"
import { TasksTableViewOptions } from "./tasks-table-view-options"

import { priorities, statuses } from "../../hooks/data/data"
import { TasksTableFacetedFilter } from "./tasks-table-faceted-filter"

interface TasksTableToolbarProps<TData> {
  table: Table<TData>
}

export function TasksTableToolbar<TData>({
  table,
}: TasksTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <TasksTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <TasksTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <TasksTableViewOptions table={table} />
    </div>
  )
}