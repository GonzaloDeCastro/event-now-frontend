import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice";
import Swal from "sweetalert2";

const Register = ({ show, onHide }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [userType, setUserType] = useState("assistant");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    preferences: [],
    age: "",
    legalName: "",
    taxId: "",
    legalAddress: "",
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "preferences") {
      const updated = checked
        ? [...formData.preferences, value]
        : formData.preferences.filter((pref) => pref !== value);
      setFormData({ ...formData, preferences: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      (userType === "assistant" && !formData.age)
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    dispatch(
      registerUser({
        ...formData,
        userType,
      })
    );
    setJustLoggedIn(true);
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  }, [error]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && justLoggedIn) {
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      onHide(); // cerrar modal
      navigate("/");
      setJustLoggedIn(false);
    }
  }, [user]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Tipo de cuenta */}
          <div className="mb-1">
            <label className="form-label d-block">Tipo de cuenta</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                value="assistant"
                checked={userType === "assistant"}
                onChange={() => setUserType("assistant")}
              />
              <label className="form-check-label">Asistente</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                value="organizer"
                checked={userType === "organizer"}
                onChange={() => setUserType("organizer")}
              />
              <label className="form-check-label">Organizador</label>
            </div>
          </div>

          {/* Comunes */}
          <div className="row mb-1">
            <div className="col-md-6">
              <label className="form-label">Nombre completo *</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nombre de usuario *</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-md-6">
              <label className="form-label">Correo electrónico *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Contraseña *</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Repetir contraseña *</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Asistente */}
          {userType === "assistant" && (
            <div className="row mb-3">
              {" "}
              <div className="col-md-6">
                <label className="form-label">Edad *</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label d-block">
                  Preferencias (opcional)
                </label>
                {["música", "feria", "taller", "teatro"].map((pref) => (
                  <div key={pref} className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="preferences"
                      value={pref}
                      onChange={handleChange}
                      checked={formData.preferences.includes(pref)}
                    />
                    <label className="form-check-label">{pref}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Organizador */}
          {userType === "organizer" && (
            <>
              <div className="row mb-1">
                <div className="col-md-6">
                  <label className="form-label">
                    Nombre legal / Razón social *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="legalName"
                    value={formData.legalName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">CUIT o ID fiscal *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Dirección legal *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="legalAddress"
                    value={formData.legalAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Teléfono de contacto *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          <Button type="submit" className="buttonGlobal w-100">
            Registrarse
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
