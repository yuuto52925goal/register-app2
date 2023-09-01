import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import {
  useNavigate,
  Navigate
} from "react-router-dom";
import MovieShowOff from "./components/MovieShowOff.js";

const Mypage = () => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
    }, []);

  const navigate = useNavigate();

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
              <MovieShowOff />
              <footer className="footer-box">
                <p className="container-script container-box">{user?.email}</p>
                <button onClick={logout} className="logout-button">ログアウト</button>
              </footer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Mypage;