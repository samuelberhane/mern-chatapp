import React from "react";
import { Login, Register, Chat } from "./pages/index";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useGlobalUserContext } from "./context/userContext";

const App = () => {
  const { user } = useGlobalUserContext();
  console.log(user);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
