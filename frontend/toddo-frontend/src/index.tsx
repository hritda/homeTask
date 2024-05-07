import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import TodoList from "./components/TodoList";
import TitleForm from "./components/TitleForm";
import TaskForm from "./components/TaskForm";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const MainApp = () => (
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="projects/:id" element={<TodoList/>} />
          <Route path="titleForm/:id" element={<TitleForm/>} />
          <Route path="taskForm/:id" element={<TaskForm/>} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

root.render(<MainApp />);
