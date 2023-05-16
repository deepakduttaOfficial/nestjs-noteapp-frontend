import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./helper/ProtectedRoute";

// Pages
import Home from "./pages/home";
import Note from "./pages/note";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/note/:noteId"
          element={
            <ProtectedRoute>
              <Note />
            </ProtectedRoute>
          }
        />
        <Route path="/e/signin" element={<Signin />} />
        <Route path="/e/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
