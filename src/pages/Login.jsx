import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAPI, clearAuthError } from "../redux/authSlice";
import Swal from "sweetalert2";

const Login = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      alert("Completa ambos campos.");
      return;
    }

    dispatch(loginUserAPI({ emailOrUsername, password }));
    setJustLoggedIn(true);
  };

  // Show error alert if login failed
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
      dispatch(clearAuthError());
    }
  }, [error]);

  // Close modal and redirect on success
  useEffect(() => {
    if (user && justLoggedIn) {
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        showConfirmButton: false,
        timer: 1500,
      });
      onHide();
      setJustLoggedIn(false); // Resetea para que no vuelva a disparar el mensaje
    }
  }, [user]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="emailOrUsername" className="form-label">
              Correo electrónico o nombre de usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="usuario@ejemplo.com o username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <Button
            type="submit"
            className="buttonGlobal w-100"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
