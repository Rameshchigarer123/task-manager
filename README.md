# Task Manager

Live demo: https://task-manager-flax-zeta.vercel.app

A one-page task manager built with React (Vite), function components and hooks only. No backend, no UI library and no state library.

## How to run

    npm install
    npm run dev

Then open http://localhost:5173.

## What works

- Loads tasks from `public/tasks.json` on the first visit, with a loader and an error message with a Retry button
- Saves every change to localStorage and loads from it on later visits
- Add a task (blank or space-only titles are rejected, Enter submits)
- Task list with priority badge, due date, checkbox and strike-through for completed tasks
- Edit a title in place (Enter saves, Escape cancels, blank is not allowed)
- Delete with a confirmation
- All / Active / Completed tabs and a "tasks left" counter
- Case-insensitive search that works with the tabs, and sort by due date or priority
- Red "Overdue" label for incomplete tasks past their due date
- Responsive layout for a 375px phone and for desktop
- Deployed on Vercel

## Design notes

- `useTasks` holds the only copy of the tasks, plus the loading and saving logic.
- The visible list, sort order, counter and progress bar are calculated on each render, never stored.
- Updates create new arrays and objects, so nothing is mutated.
- The app is split into small components: `TaskForm`, `FilterTabs`, `Toolbar`, `TaskList` and `TaskItem`.

## Not done

- Undo after delete
- Light and dark theme toggle
- Unit tests