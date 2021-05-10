export type LinksType = {
  to: string;
  title: string;
};

const navlinks: LinksType[] = [
  {
    to: "/todo",
    title: "Tasks Lists",
  },
  {
    to: "/doneTasks",
    title: "Completed Tasks",
  },
  {
    to: "/settings",
    title: "Settings",
  },
];

export default navlinks;
