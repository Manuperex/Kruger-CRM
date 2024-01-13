import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NewEmployee, { action as actionNewEmployee } from "./pages/NewEmployee";
import Index, { loader as employeesLoader } from "./pages/Index";
import EditEmployee, {
  loader as editEmployeeLoader,
  action as editarEmployeeAction,
} from "./pages/EditEmployee";
import ErrorPage from "./components/ErrorPage";
import { action as deleteEmployeeAction } from "./components/Employee";
import { action as getEmployeeUserAction } from "./components/LoginForm";
import Login from "./pages/Login";
import User, { loader as getEmployeeUserLoader } from "./pages/User";
import EditUser, {
  loader as editUserLoader,
  action as editUserAction,
} from "./pages/EditUser";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: employeesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/employees/new",
        element: <NewEmployee />,
        action: actionNewEmployee,
      },
      {
        path: "/employees/:employeeId/edit",
        element: <EditEmployee />,
        loader: editEmployeeLoader,
        action: editarEmployeeAction,
      },
      {
        path: "/employees/:employeeId/delete",
        action: deleteEmployeeAction,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: getEmployeeUserAction,
  },
  {
    path: "/user/:emailUser",
    element: <User />,
    loader: getEmployeeUserLoader,
  },
  {
    path: "/user/:email/edit",
    element: <EditUser />,
    loader: editUserLoader,
    action: editUserAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
