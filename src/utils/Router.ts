import React from "react";
import withSuspense from "../hoc/withSuspense";

const ToDoLists = React.lazy(() => import("../pages/ToDoLists/ToDoLists"));
const CompletedTasks = React.lazy(() => import("../pages/CompletedTasks/CompletedTasks"));
const Settings = React.lazy(() => import("../pages/Settings/Settings"));

const SuspendedToDoLists = withSuspense(ToDoLists);
const SuspendedCompletedTasks = withSuspense(CompletedTasks);
const SuspendedSettings = withSuspense(Settings);

export type ComponentsType = {
  path: string;
  Component: React.FC;
};

const Routes: ComponentsType[] = [
  {
    path: "/todo",
    Component: SuspendedToDoLists,
  },
  {
    path: "/doneTasks",
    Component: SuspendedCompletedTasks,
  },
  {
    path: "/settings",
    Component: SuspendedSettings,
  },
  {
    path: "/",
    Component: SuspendedToDoLists,
  },
];

export default Routes;
