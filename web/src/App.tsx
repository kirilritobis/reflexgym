import React, { ChangeEvent, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import BarcodeInput from "./components/BarcodeInput/BarcodeInput";
import Login from "./components/Login/Login";
import UsersAll from "./components/UsersAll/UsersAll";

function App() {
  return (
    <div className="App">
      <BarcodeInput />
      <BrowserRouter>
        {/* <AuthContext.Provider value={{ ...authValue, setLoginState: setAuthValue }}> */}
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<UsersAll />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<UsersAll />} />
        </Routes>
        {/* </AuthContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
