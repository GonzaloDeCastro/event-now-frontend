import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { sampleEvents } from "../redux/sampleEvents";
import styles from "./Home.module.css";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = sampleEvents.find((e) => e.id === id);

  if (!event) {
    return <p className="text-center mt-5">Evento no encontrado.</p>;
  }

  return (
    <div className="container my-2">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="mb-3">{event.title}</h2>{" "}
        <IoCloseSharp
          className={styles.iconCloseEventDetail}
          onClick={() => navigate(-1)}
        />
      </div>
      <img
        src={event.image}
        alt={event.title}
        className="img-fluid mb-4"
        style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
      />
      <p>
        <strong>Fecha:</strong> {event.date}
      </p>
      <p>
        <strong>Lugar:</strong> {event.location}
      </p>
      <p>
        <strong>Organiza:</strong> {event.organizer}
      </p>
      <p>
        <strong>Descripción:</strong> {event.description}
      </p>
      <p>
        <strong>Tipo:</strong> {event.category}
      </p>
      <p>
        <strong>Acceso:</strong> {event.isFree ? "Gratuito" : "Pago"}
      </p>
      <p>
        <strong>Edad:</strong> {event.ageRestriction || "Todas las edades"}
      </p>
      <p>
        <strong>Tipo de lugar:</strong> {event.locationType}
      </p>
      <p>
        <strong>Ubicación: </strong>
        {event.city}, {event.province}
      </p>
    </div>
  );
};

export default EventDetail;
