import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Feed from "./pages/Feed";
import AskAI from "./pages/AskAI";
import Lawyers from "./pages/Lawyers";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BottomNav from "./components/BottomNav";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const page = location.pathname.replace("/", "") || "feed";
  const setPage = (p) => navigate(p === "feed" ? "/" : `/${p}`);
  const hideNav = ["/login", "/signup"].includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setChecked(true);
  }, [location.pathname]);

  // Check hone tak kuch mat dikhao
  if (!checked) return null;

  // Login/Signup pages — agar already logged in hai toh feed pe bhejo
  if (location.pathname === "/login" || location.pathname === "/signup") {
    if (loggedIn) return <Navigate to="/" />;
    return (
      <>
        {location.pathname === "/login" && <Login />}
        {location.pathname === "/signup" && <Signup />}
      </>
    );
  }

  // Protected pages — agar logged in nahi hai toh signup pe bhejo
  if (!loggedIn) return <Navigate to="/signup" />;

  return (
    <div>
      {location.pathname === "/" && <Feed page={page} />}
      {location.pathname === "/askai" && <AskAI page={page} />}
      {location.pathname === "/lawyers" && <Lawyers page={page} />}
      {location.pathname === "/profile" && <Profile page={page} />}

      {!hideNav && <BottomNav page={page} setPage={setPage} />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;