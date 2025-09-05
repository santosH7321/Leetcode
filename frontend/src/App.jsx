import React from "react";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {checkAuth} from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const App = () => {

  const dispatch = useDispatch();
  const {isAuthenticated, loading} = useSelector((state) => state.auth);


  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading){
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }
  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/signup" />}></Route>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />}></Route>
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> :<Signup />}></Route>
      </Routes>
    </>
  );
};

export default App;
