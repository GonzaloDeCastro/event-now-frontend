import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  clearEventError,
  clearEventSuccess,
} from "../redux/eventSlice";
import Swal from "sweetalert2";

/**
 * Modal component for organizers to create a new event.
 * Shows only if user is logged in and is an organizer.
 */
const EventForm = ({ onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("authToken");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.events);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image_url: "",
    city: "",
    province: "",
    location: "",
    location_type: "cerrado",
    date: "",
    time: "",
    is_free: true,
    price: 0,
    discount_percent: 0,
    capacity: 0,
    age_restriction: "",
    has_checkin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        createEvent({
          eventData: formData,
          token: token,
        })
      );
      Swal.fire({
        icon: "success",
        title: "Evento creado",
        text: "El evento fue creado exitosamente.",
        timer: 1800,
        showConfirmButton: false,
      });
      setShowModal(false); // cerrar modal
    } catch (error) {
      console.error("Error al crear evento:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al crear el evento.",
      });
    }
  };

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        icon: "success",
        title: "Evento creado",
        text: successMessage,
        timer: 1800,
        showConfirmButton: false,
      });
      dispatch(clearEventSuccess());
      setShowModal(false); // cerrar modal
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
      dispatch(clearEventError());
    }
  }, [successMessage, error]);

  // Check if user is logged in and is an organizer and show button Crear Evento
  if (!user || user.userType !== 2) return null;

  const handleShowModal = () => {
    setShowModal(true);
    onClose();
  };

  return (
    <>
      <a className="menu-item" onClick={handleShowModal}>
        ➕ Crear Evento{" "}
      </a>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header
          closeButton
          className={`${
            user && user.userType == 2
              ? "modal-header-organizer"
              : "modal-header"
          }`}
        >
          <Modal.Title>Crear nuevo evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control"
                name="title"
                placeholder="Título"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="category"
                placeholder="Categoría"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <textarea
                className="form-control"
                name="description"
                placeholder="Descripción"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="image_url"
                placeholder="URL de imagen"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="location"
                placeholder="Lugar"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="city"
                placeholder="Ciudad"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="province"
                placeholder="Provincia"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                name="location_type"
                onChange={handleChange}
              >
                <option value="cerrado">Cerrado</option>
                <option value="abierto">Abierto</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                name="date"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="time"
                className="form-control"
                name="time"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 d-flex gap-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="is_free"
                  checked={formData.is_free}
                  onChange={handleChange}
                />
                <label className="form-check-label">Evento gratuito</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="has_checkin"
                  checked={formData.has_checkin}
                  onChange={handleChange}
                />
                <label className="form-check-label">Control con QR</label>
              </div>
            </div>

            {!formData.is_free && (
              <>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="Precio"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    name="discount_percent"
                    placeholder="Descuento %"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                name="capacity"
                placeholder="Capacidad máxima"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="age_restriction"
                placeholder="Restricción de edad (ej: 18+)"
                onChange={handleChange}
              />
            </div>

            <div className="col-12 text-end">
              <Button type="submit" className="buttonGlobalOrganizer">
                Crear evento
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventForm;
