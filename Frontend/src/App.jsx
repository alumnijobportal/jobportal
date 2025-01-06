import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/auth/Landing";
import Dashboard from "./pages/main/Dashboard";
import { ProtectedRoute } from "./components/utils/ProtectedRoute";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/utils/PrivateRoute";
import Header from "./components/utils/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute />}>
         
          <Route path="/landing" element={<><Header/> <Landing /></> } />
          <Route path="/signup" element={<><Header/><Signup /></> } />
          <Route path="/login" element={<><Header/><Login /></>  } />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
