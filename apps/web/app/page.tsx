import { Metadata } from "next"

import { TasksTable, columns, AddTaskDrawer } from "../modules/tasks"
import { getClient } from '../graphql/client/server';
import { query } from "../modules/tasks/queries/tasks.query"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker",
}

// Simulate a database read for tasks.
async function getTasks() {
  const client = await getClient();
  const { data } = await client.query({
    query,
  });

  return data.tasks
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <AddTaskDrawer />
          </div>
        </div>
        <TasksTable data={tasks.map(task => ({
          ...task,
          priority: 'high',
          assigneeId: task.assigneeId ?? '',
        }))} columns={columns} />
      </div>
  )
}