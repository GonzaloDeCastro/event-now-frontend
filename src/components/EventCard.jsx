import { useNavigate } from "react-router-dom";
import styles from "./EventCard.module.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
    <div className={`card ${styles.card}`}>
      <img
        src={event.image_url}
        className={styles.cardImgTop}
        alt={event.title}
      />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">{event.location}</p>
        <p className="card-text">
          <small className="text-muted">
            {new Date(event.date).toLocaleDateString("es-AR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </p>
        <div className="d-flex gap-2 align-items-center">
          <button
            className={styles.more}
            onClick={() => navigate(`/event/${event.id}`)}
          >
            Ver más
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleAttend}
          >
            Asistir
          </button>

          {/* Contenedor del precio */}
          <div
            className={`${styles.priceTag} ${
              event.is_free === 1 ? styles.free : styles.paid
            }`}
          >
            {event.is_free === 1 ? "Gratis" : `$${event.price}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
