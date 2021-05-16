import Home from "./../pages/Home/Home";
import Confirm from "./../pages/Confirm/Confirm";
import Workspace from "./../pages/Workspace/Workspace";
export const appRouter = [
  { path: "/home", component: Home, exact: true },
  { path: "/confirm/:path", component: Confirm, exact: true },
  { path: "/workspace/:id", component: Workspace, exact: true },
];
