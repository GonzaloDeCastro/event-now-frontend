import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
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

    // Validación simple (deberías mejorarla con SweetAlert2 más adelante)
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

    // Simulación
    console.log("Datos enviados:", { ...formData, userType });
    navigate("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100%", backgroundColor: "#f8f9fa" }}
    >
      <form
        onSubmit={handleSubmit}
        className="card mx-auto p-3 shadow"
        style={{ width: "95%" }}
      >
        <h3 className="text-center mb-1">Registro</h3>

        {/* Tipo de usuario */}
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

        {/* Asistente: Preferencias y edad */}
        {userType === "assistant" && (
          <>
            <div className="row mb-3">
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
            </div>
          </>
        )}

        {/* Organizador: Datos legales */}
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
              </div>{" "}
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
              </div>{" "}
              <div className="col-md-6">
                <label className="form-label">Teléfono de contacto *</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>{" "}
            </div>

            {/*   <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  Sitio web o redes sociales (opcional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div> */}
          </>
        )}

        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
