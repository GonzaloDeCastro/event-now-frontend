import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Map, Marker } from "pigeon-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAPI,
  clearEventError,
  clearEventSuccess,
} from "../redux/eventSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "./AddressAutocomplete";

const EventForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { error, successMessage } = useSelector((state) => state.events);
  const userLocation = useSelector((state) => state.location);

  const [showModal, setShowModal] = useState(false);
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
    latitude: null,
    longitude: null,
  });

  // arriba, junto a tus useState:
  const [mapCenter, setMapCenter] = useState(null); // [lat, lng] o null
  const [mapZoom, setMapZoom] = useState(14);

  // cuando cambian las coords del form o la ubicación del usuario, recalculá el centro
  useEffect(() => {
    if (formData.latitude && formData.longitude) {
      setMapCenter([Number(formData.latitude), Number(formData.longitude)]);
      setMapZoom(16); // un zoom más cercano al seleccionar dirección
    } else if (userLocation?.coords) {
      setMapCenter([userLocation.coords.lat, userLocation.coords.lng]);
      setMapZoom(14);
    } else {
      // fallback (Rosario como ejemplo)
      setMapCenter([-32.9442, -60.6505]);
      setMapZoom(12);
    }
  }, [formData.latitude, formData.longitude, userLocation?.coords]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Disparamos la creación; NO mostramos swal acá.
    dispatch(createEventAPI(formData));
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
      setShowModal(false);
      navigate("/my-created-events");
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: typeof error === "string" ? error : JSON.stringify(error),
      });
      dispatch(clearEventError());
    }
  }, [successMessage, error, dispatch]);

  // Limpia mensajes si el modal se cierra o el componente se desmonta (opcional)
  useEffect(() => {
    return () => {
      dispatch(clearEventError());
      dispatch(clearEventSuccess());
    };
  }, [dispatch]);

  if (!user || user.role !== 2) return null;

  const handleShowModal = () => {
    setShowModal(true);
    onClose?.();
  };
  console.log(`${formData.latitude},${formData.longitude}`);
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
            user && user.role == 2 ? "modal-header-organizer" : "modal-header"
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
            <div className="col-md-12">
              <input
                className="form-control"
                name="image_url"
                placeholder="URL de imagen"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <AddressAutocomplete
                value={formData.location}
                countryCodes="ar"
                contextCity={formData.city}
                contextProvince={formData.province}
                proximity={userLocation.coords}
                radiusKm={25}
                onSelect={(sel) => {
                  setFormData((prev) => ({
                    ...prev,
                    location: sel.label,
                    city: sel.city || prev.city,
                    province: sel.province || prev.province,
                    latitude: sel.lat,
                    longitude: sel.lng,
                  }));
                }}
                onClear={() => {
                  setFormData((prev) => ({
                    ...prev,
                    location: "", // opcional, pero recomendable
                    city: "",
                    province: "",
                    latitude: null,
                    longitude: null,
                  }));
                }}
              />
            </div>
            {/* Ciudad / Provincia quedan editables y se autocompletan si hay datos */}
            <div className="col-md-6">
              <input
                className="form-control"
                name="city"
                value={formData.city}
                placeholder="Ciudad"
                disabled
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="province"
                value={formData.province}
                placeholder="Provincia"
                disabled
              />
            </div>{" "}
            <div className="col-md-6">
              <input
                className="form-control"
                name="location"
                placeholder="Lugar"
                onChange={handleChange}
              />
            </div>
            {mapCenter && (
              <Map
                height={300}
                center={mapCenter}
                zoom={mapZoom}
                animate={true}
                onBoundsChanged={({ center, zoom }) => {
                  // permite arrastrar/zoomear manualmente sin que “rebote”
                  setMapCenter(center);
                  setMapZoom(zoom);
                }}
              >
                {formData.latitude && formData.longitude && (
                  <Marker
                    width={50}
                    anchor={[
                      Number(formData.latitude),
                      Number(formData.longitude),
                    ]}
                    // forzá re-mount del marcador si cambia la dirección
                    key={`${formData.latitude},${formData.longitude}`}
                  />
                )}
              </Map>
            )}
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
