import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfileButton = ({ onLoginClick, onRegisterClick }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="d-flex align-items-center gap-3"
      style={{ marginRight: "1rem", color: "white" }}
    >
      {user ? (
        <>
          <span style={{ fontWeight: "500" }}>Hola, {user.username}</span>
          <FaUserCircle style={{ width: "24px", height: "24px" }} />
        </>
      ) : (
        <>
          <div
            onClick={onLoginClick}
            style={{
              cursor: "pointer",
              borderRight: "1px solid white",
              paddingRight: "0.5rem",
            }}
          >
            Iniciar Sesión
          </div>

          <div onClick={onRegisterClick} style={{ cursor: "pointer" }}>
            Registrarse
          </div>

          <FaUserCircle style={{ width: "24px", height: "24px" }} />
        </>
      )}
    </div>
  );
};

export default ProfileButton;
