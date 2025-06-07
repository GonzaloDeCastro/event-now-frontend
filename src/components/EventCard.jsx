import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  return (
    <div className={`card ${styles.card}`}>
      <img src={event.image} className={styles.cardImgTop} alt={event.title} />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">{event.location}</p>
        <p className="card-text">
          <small className="text-muted">{event.date}</small>
        </p>
        <button className="btn btn-primary">Ver más</button>
      </div>
    </div>
  );
};

export default EventCard;
