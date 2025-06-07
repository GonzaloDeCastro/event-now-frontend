import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { useState } from "react";

const AppRouter = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("menuOpen", menuOpen);
  return (
    <Router>
      <Navbar
        isMenuOpen={menuOpen}
        toggleMenu={() => setMenuOpen((prev) => !prev)}
      />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
