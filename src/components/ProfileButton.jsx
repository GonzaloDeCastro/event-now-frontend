import { FaUserCircle } from "react-icons/fa";

const ProfileButton = () => {
  return (
    <div
      className="d-flex align-items-center gap-2"
      style={{
        marginRight: "1rem",
        color: "white",
      }}
    >
      <p className="mb-0" style={{ cursor: "pointer" }}>
        Iniciar Sesión / Registrarse
      </p>
      <FaUserCircle
        style={{
          width: "32px",
          height: "32px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ProfileButton;
