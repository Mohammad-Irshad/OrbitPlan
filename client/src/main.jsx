import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./app/store/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Task from "./pages/Task.jsx";
import Reports from "./pages/Reports.jsx";
import Teams from "./pages/Teams.jsx";
import Projects from "./pages/Projects.jsx";
import Settings from "./pages/Settings.jsx";
import UserProject from "./pages/UserProject.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/signup",
    element: <UserSignup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/task/:id",
    element: (
      <ProtectedRoute>
        <Task />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teams",
    element: (
      <ProtectedRoute>
        <Teams />
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects",
    element: (
      <ProtectedRoute>
        <Projects />
      </ProtectedRoute>
    ),
  },
  {
    path: `/userProject/:id`,
    element: (
      <ProtectedRoute>
        <UserProject />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <StrictMode> */}
    <RouterProvider router={router}></RouterProvider>
    {/* </StrictMode> */}
  </Provider>
);
