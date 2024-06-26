import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { Navigate, Link } from "react-router-dom";


const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
      } catch(error) {
        alert("メールアドレスまたはパスワードが間違っています");
      }
    };
  
    const [user, setUser] = useState();
  
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    });
  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <div className="container-box">
            <h1 className="container-title container-box">ログイン</h1>
            <form onSubmit={handleSubmit} className="container-form">
              <div>
                <label>メールアドレス</label>
                {/* ↓「value」と「onChange」を追加 */}
                <input
                  name="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="container-input"
                />
              </div>
              <div>
                <label>パスワード</label>
                {/* ↓「value」と「onChange」を追加 */}
                <input
                  name="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="container-input"
                />
              </div>
              <button className="container-button">ログイン</button>
              <p className="container-script">新規登録は<Link to={`/register/`}>こちら</Link></p>
            </form>
        </div>
      )}
    </>
  );
};

export default Login;