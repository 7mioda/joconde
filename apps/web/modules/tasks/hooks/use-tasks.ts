import tasks from "./data/tasks.json"

export function useTask(taskId: string) {
  const task = tasks.find((task) => task.id === taskId)

  return task
}