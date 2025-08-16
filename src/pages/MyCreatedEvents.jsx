import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCreatedEventsAPI } from "../redux/eventSlice";
import EventCard from "../components/EventCard";
import styles from "./Home.module.css";

const MyCreatedEvents = () => {
  const dispatch = useDispatch();
  const { myCreatedEvents, loading, error } = useSelector(
    (state) => state.events
  );
  console.log("myCreatedEvents", myCreatedEvents);
  useEffect(() => {
    dispatch(getMyCreatedEventsAPI());
  }, [dispatch]);

  return (
    <div className={styles.homeContainer}>
      <h2
        className="text-center my-0"
        style={{ backgroundColor: "#e8f4fc", padding: "1rem" }}
      >
        📅 Eventos que organizás
      </h2>

      {loading && (
        <p className="text-center mt-4">Cargando eventos creados...</p>
      )}
      {error && <p className="text-danger text-center mt-4">Error: {error}</p>}

      {!loading && myCreatedEvents.length === 0 && (
        <p className="text-center mt-4">Todavía no creaste ningún evento.</p>
      )}

      <div className={styles.gridContainer}>
        {myCreatedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default MyCreatedEvents;
