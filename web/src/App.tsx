import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import UserDialog from "./components/UserDialog/UserDialog";
import UsersAll from "./components/UsersAll/UsersAll";

function App() {
  const [userCardNumber, setUserCardNumber] = useState<string>("");
  return (
    <div className="App">
      <button onClick={() => setUserCardNumber("korten")}>asd</button>
      <BrowserRouter>
        <UserDialog
          userCardNumber={userCardNumber}
          setUserCardNumber={setUserCardNumber}
        />
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
