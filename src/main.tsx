import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Uploads from "./pages/Uploads";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router basename="/filehub-frontend">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/uploads" element={<Uploads />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
