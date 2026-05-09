import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Feed from "./pages/Feed";
import AskAI from "./pages/AskAI";
import Lawyers from "./pages/Lawyers";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const page = location.pathname.replace("/", "") || "feed";

  const setPage = (p) => navigate(p === "feed" ? "/" : `/${p}`);

  return (
    <div>
      {location.pathname === "/" && <Feed page={page} />}
      {location.pathname === "/askai" && <AskAI page={page} />}
      {location.pathname === "/lawyers" && <Lawyers page={page} />}
      {location.pathname === "/profile" && <Profile page={page} />}

      <BottomNav page={page} setPage={setPage} />
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