import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import EventDetail from "../pages/EventDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyCreatedEvents from "../pages/MyCreatedEvents";
const AppRouter = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Router>
      <Navbar
        isMenuOpen={menuOpen}
        toggleMenu={() => setMenuOpen((prev) => !prev)}
        onLoginClick={() => setShowLogin(true)} // pasamos función para abrir modal
        onRegisterClick={() => setShowRegister(true)}
      />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        {/* Eliminamos la ruta de login */}
        <Route path="/register" element={<Register />} />
        <Route path="/my-created-events" element={<MyCreatedEvents />} />
      </Routes>
      <Register show={showRegister} onHide={() => setShowRegister(false)} />
      {/* Modal de login */}
      <Login show={showLogin} onHide={() => setShowLogin(false)} />
    </Router>
  );
};

export default AppRouter;
