# Joconde Web App

A modern task and issue tracker built with Next.js, featuring a modular architecture that promotes maintainability and scalability.

## Architecture Overview

This application follows a **modular architecture** where each module is responsible for a specific domain of functionality. Each component within a module has a **single responsibility** - handling one specific action or feature.

### Module Structure

The app is organized into domain-specific modules located in `/modules`:

```
modules/
├── tasks/          # Task management functionality
├── tracker/        # Real-time tracking and subscriptions
├── team/           # Team member management
├── project/        # Project management
└── theming/        # Theme and styling configuration
```

### How Modules Work

Each module follows a consistent structure:

```
module-name/
├── components/     # UI components specific to this domain
├── queries/        # GraphQL queries for data fetching
├── mutations/      # GraphQL mutations for data changes
├── hooks/          # Custom React hooks
└── index.ts        # Public API exports
```

### Single Responsibility Components

Every component is designed to handle **one specific action**:

#### Tasks Module Examples:
- `add-task-form/` - **Single action**: Create a new task
- `edit-task-form/` - **Single action**: Modify existing task data
- `delete-task-button/` - **Single action**: Remove a task
- `mark-as-favorite-button/` - **Single action**: Toggle task favorite status
- `tasks-table/` - **Single action**: Display and manage task list

#### Table Components (Single Responsibility):
- `tasks-table-toolbar/` - **Single action**: Provide table controls and filters
- `tasks-table-pagination/` - **Single action**: Handle page navigation
- `tasks-table-faceted-filter/` - **Single action**: Apply column-based filtering
- `tasks-table-row-actions/` - **Single action**: Provide row-specific operations

### Module Integration

Modules are integrated through providers in the app layout:

```tsx
// app/layout.tsx
<GraphQLProvider>
  <TrackerProvider>
    <ThemingProvider>
      {/* App content */}
    </ThemingProvider>
  </TrackerProvider>
</GraphQLProvider>
```

### Usage Pattern

Components are imported from their respective modules:

```tsx
// Import from tasks module
import { TasksTable, AddTaskDrawer } from "../modules/tasks"

// Import from project module
import { ProjectSelect } from "../modules/project"

// Import from team module  
import { TeamMemberSelect } from "../modules/team"
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Principles

1. **Single Responsibility**: Each component handles exactly one action or feature
2. **Module Isolation**: Modules are self-contained with clear boundaries
3. **Composable Design**: Components can be easily combined and reused
4. **Type Safety**: Full TypeScript support with Zod schema validation
5. **GraphQL Integration**: Centralized data management with GraphQL

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL](https://graphql.org/)
- [TanStack Table](https://tanstack.com/table) - Used for data tables
- [Zod](https://zod.dev/) - Schema validation

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
