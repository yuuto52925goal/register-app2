import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
/* ↓「Navigate」をimport */
import {
  useNavigate,
  Navigate
} from "react-router-dom";

const Mypage = () => {
    const [user, setUser] = useState("");
    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        /* ↓追加 */
        setLoading(false);
      });
    }, []);

  /* ↓「navigate」を定義 */
  const navigate = useNavigate();

  /* ↓関数「logout」を定義 */
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  }

  return (
    <>
      {/* ↓「loading」がfalseのときにマイページを表示する設定 */}
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <h1>マイページ</h1>
              <p>{user?.email}</p>
              <button onClick={logout}>ログアウト</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Mypage;