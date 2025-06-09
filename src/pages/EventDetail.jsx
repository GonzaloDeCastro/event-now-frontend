import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { sampleEvents } from "../redux/sampleEvents";
import styles from "./Home.module.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const event = sampleEvents.find((e) => e.id === id);

  if (!event) return <p className="text-center mt-5">Evento no encontrado.</p>;
  const handleAttend = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión para asistir al evento",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    }

    console.log(`Asistir al evento: ${event.title}`);
  };

  return (
    <div className="container py-1">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold m-0">{event.title}</h2>
        <div
          className={styles.iconCloseEventDetail}
          onClick={() => navigate(-1)}
          title="Cerrar"
        >
          <IoCloseSharp size={24} />
        </div>
      </div>

      <div className="card p-4 shadow-sm">
        <img
          src={event.image}
          alt={event.title}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />

        <div className="row gy-3">
          <div className="col-md-6">
            <span>
              📅 <strong>Fecha:</strong> {event.date}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              📍 <strong>Lugar:</strong> {event.location}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              👤 <strong>Organiza:</strong> {event.organizer}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              💸 <strong>Acceso:</strong> {event.isFree ? "Gratuito" : "Pago"}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              🔞 <strong>Edad:</strong>{" "}
              {event.ageRestriction || "Todas las edades"}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              🏛️ <strong>Tipo de lugar:</strong> {event.locationType}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              🌍 <strong>Ubicación:</strong> {event.city}, {event.province}
            </span>
          </div>

          <div className="col-12">
            <span>
              📝 <strong>Descripción:</strong>
            </span>
            <p className="mt-1">{event.description}</p>
          </div>
          <div className="col-12">
            <span>
              🎭 <strong>Categoría:</strong> {event.category}
            </span>
          </div>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <button
            className={`btn btn-outline-danger btn-sm`}
            onClick={handleAttend}
          >
            Asistir
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
