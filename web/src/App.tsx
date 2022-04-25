import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import UsersAll from "./components/UsersAll/UsersAll";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <AuthContext.Provider value={{ ...authValue, setLoginState: setAuthValue }}> */}
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<UsersAll />} />
          <Route path="*" element={<UsersAll />} />
        </Routes>
        {/* </AuthContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
