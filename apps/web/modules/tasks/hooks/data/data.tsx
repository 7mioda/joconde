import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CheckCircle,
    Circle,
    CircleOff,
    HelpCircle,
    Timer,
  } from "davinci/icons"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "BACKLOG",
      label: "Backlog",
      icon: HelpCircle,
    },
    {
      value: "TODO",
      label: "Todo",
      icon: Circle,
    },
    {
      value: "IN_PROGRESS",
      label: "In Progress",
      icon: Timer,
    },
    {
      value: "DONE",
      label: "Done",
      icon: CheckCircle,
    },
    {
      value: "CANCELED",
      label: "Canceled",
      icon: CircleOff,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "LOW",
      icon: ArrowDown,
    },
    {
      label: "Medium",
      value: "MEDIUM",
      icon: ArrowRight,
    },
    {
      label: "High",
      value: "HIGH",
      icon: ArrowUp,
    },
  ]