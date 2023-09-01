import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Mypage from "./Mypage";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={`/register/`} element={<Register />} />
          <Route path={`/login/`} element={<Login />} />
          <Route path={`/`} element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
