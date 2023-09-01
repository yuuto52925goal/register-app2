import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { Navigate, Link } from "react-router-dom";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch(error) {
      alert("正しく入力してください");
    }
  };
  const [user, setUser] = useState("");

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <div className="container-box">
          <h1 className="container-title">新規登録</h1>
          <form onSubmit={handleSubmit} className="container-form">
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="container-input"
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="container-input"
              />
            </div>
            <button className="container-button">登録する</button>
            <p className="container-script">ログインは<Link to={`/login/`}>こちら</Link></p>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;  