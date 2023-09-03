import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import {
  useNavigate,
  Navigate,
  Link
} from "react-router-dom";
import MovieShowOff from "./components/MovieShowOff.js";
import WatchList from "./components/WatchList.js";


const Mypage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser); 
        setLoading(false);
      });

      return () => unsubscribe();
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
            <div className="mypage-container">
              <MovieShowOff user={user} />
              <WatchList user={user} />
              <footer className="footer-box">
                <p className="container-script container-box">{user?.email}</p>
                <button onClick={logout} className="logout-button">ログアウト</button>
              </footer>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Mypage;