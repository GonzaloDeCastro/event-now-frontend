import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ProfileButton = ({ onLoginClick, onRegisterClick }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Desea salir de la sesión?",
      showCancelButton: true,
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser());
      }
    });
  };

  return (
    <div
      className="d-flex align-items-center gap-3"
      style={{ marginRight: "1rem", color: "white" }}
    >
      {user ? (
        <>
          <span style={{ fontWeight: "500" }}>Hola, {user.username}</span>
          <FaUserCircle style={{ width: "24px", height: "24px" }} />
          <FaSignOutAlt
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
            onClick={handleLogout}
          />
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
