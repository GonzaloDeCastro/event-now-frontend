import { IoMdArrowRoundBack } from "react-icons/io";
import { Map, Marker } from "pigeon-maps";
import { useParams /* useNavigate */ } from "react-router-dom";
import styles from "./Home.module.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

const EventDetail = () => {
  const { id } = useParams();
  /* const navigate = useNavigate(); */
  const { user } = useSelector((state) => state.auth);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/events/by-id/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleAttend = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión para asistir al evento",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
      return;
    }

    console.log(`Asistir al evento: ${event.title}`);
  };

  if (loading) return <p className="text-center mt-5">Cargando evento...</p>;
  if (!event) return <p className="text-center mt-5">Evento no encontrado.</p>;

  return (
    <div
      style={{
        border: "none",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* <div
          className={styles.iconCloseEventDetail}
          onClick={() => navigate(-1)}
          title="Cerrar"
        >
          <IoMdArrowRoundBack size={24} />
        </div> */}
      </div>

      <div className={styles.containerEventDetail}>
        <img
          src={event.image_url}
          alt={event.title}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />

        <div className={`row gy-3 ${styles.eventDetails}`}>
          <h2 className="fw-bold m-0">{event.title}</h2>
          <div className="col-md-6">
            <span>
              📅 <strong>Fecha:</strong>{" "}
              {new Date(event.date).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              📍 <strong>Lugar:</strong> {event.location}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              👤 <strong>Organiza:</strong> {event.organizer || "Desconocido"}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              💸 <strong>Acceso:</strong>{" "}
              {event.is_free ? "Gratuito" : `$${event.price}`}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              🔞 <strong>Edad:</strong>{" "}
              {event.age_restriction || "Todas las edades"}
            </span>
          </div>
          <div className="col-md-6">
            <span>
              🏛️ <strong>Tipo de lugar:</strong> {event.location_type}
            </span>
          </div>

          <div className="col-md-6">
            <span>
              🌍 <strong>Ubicación:</strong> {event.city}, {event.province}
            </span>
          </div>
          <div className="col-6">
            <span>
              🎭 <strong>Categoría:</strong> {event.category}
            </span>
          </div>

          <div className="col-12">
            <span>
              📝 <strong>Descripción:</strong>
            </span>
            <p className="mt-1">{event.description}</p>
          </div>
        </div>
        <Map
          height={300}
          defaultCenter={[-32.95698, -60.645007]}
          defaultZoom={14}
        >
          <Marker width={50} anchor={[-32.95698, -60.645007]} />
        </Map>

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
