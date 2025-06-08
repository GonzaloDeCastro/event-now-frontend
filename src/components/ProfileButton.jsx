import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const ProfileButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center gap-3"
      style={{ marginRight: "1rem", color: "white" }}
    >
      <div
        onClick={() => navigate("/login")}
        style={{
          cursor: "pointer",
          borderRight: "1px solid white",
          paddingRight: "0.5rem",
        }}
      >
        Iniciar Sesión
      </div>

      <div onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
        Registrarse
      </div>

      <FaUserCircle style={{ width: "24px", height: "24px" }} />
    </div>
  );
};

export default ProfileButton;
