import { Navigate, useRoutes } from "react-router-dom";

import { AppLayout, TeamAppLayout } from "./layouts";

import StartPage from "./pages/start-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import AdminTask from "./pages/admin-tasks";
import UserTask from "./pages/user-tasks";
import ProjectTask from "./pages/project-tasks";
import AdminManage from "./pages/admin-manage/Manage";
import AdminProject from "./pages/admin-project/Project";

const ProtectedRoute = ({ role, children }) => {
  
  if (!localStorage.getItem("isAuthenticated") || localStorage.getItem("role") !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="admin">
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/admin/tasks" />, index: true },
        {
          path: "accounts",
          element: <AdminManage/>,
        },
        {
          path: "projects",
          element: <AdminProject/>,
        },
        {
          path: "tasks",
          element: <AdminTask />,
        },
      ],
    },
    {
      // TO-DO: fix layout of team
      path: "/team",
      element: (
        <ProtectedRoute role="team">
          <TeamAppLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/team/tasks" />, index: true },
        {
          path: "tasks",
          element: <UserTask />,
        },
        {
          path: "team-tasks",
          element: <ProjectTask />,
        },
      ],
    },
    {
      path: "/",
      element: <StartPage />,
    },
    {
      path: "/login-admin",
      element: <LoginPage role="admin" />,
    },
    {
      path: "/login-team",
      element: <LoginPage role="team" />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return routes;
}
