import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import TodoList from "./components/TodoList";
import TitleForm from "./components/TitleForm";
import TaskForm from "./components/TaskForm";
import Register from "./components/Register";
import Authenticate from "./components/Authenticate";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="auth" element={<Authenticate />}>
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="projects/:id" element={<TodoList />} />
        <Route path="titleForm/:id" element={<TitleForm />} />
        <Route path="taskForm/:id" element={<TaskForm />} />
      </Route>
    </Route>
  )
);

const AppRoutes = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
root.render(<AppRoutes />);
