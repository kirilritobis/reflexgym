import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import BarcodeInput from "./components/BarcodeInput/BarcodeInput";
import Login from "./components/Login/Login";
import Plans from "./components/Plans/Plans";
import Sidebar from "./components/Sidebar/Sidebar";
import UsersAll from "./components/UsersAll/UsersAll";

function App() {
  return (
    <div className="App">
      <BarcodeInput />
      <Sidebar />
      {/* <AuthContext.Provider value={{ ...authValue, setLoginState: setAuthValue }}> */}
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<UsersAll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="*" element={<UsersAll />} />
      </Routes>
      {/* </AuthContext.Provider> */}
    </div>
  );
}

export default App;
