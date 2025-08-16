import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsAPI } from "../redux/eventSlice";
import styles from "./Home.module.css";
import EventCard from "../components/EventCard";
import { getCityFromCoords } from "../utils/geoUtils";

const Home = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.location);
  const [city, setCity] = useState(null);
  const {
    searchTerm,
    fromDate,
    toDate,
    category,
    isFree,
    ageRestriction,
    locationType,
  } = useSelector((state) => state.filters);

  const { allEvents, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEventsAPI());
  }, [dispatch]);

  const filteredEvents = allEvents
    .filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((event) => !fromDate || event.date >= fromDate)
    .filter((event) => !toDate || event.date <= toDate)
    .filter((event) => !category || event.category === category)
    .filter((event) => isFree === null || event.is_free === isFree)
    .filter(
      (event) => !ageRestriction || event.age_restriction === ageRestriction
    )
    .filter((event) => !locationType || event.location_type === locationType);

  useEffect(() => {
    (async () => {
      if (userLocation?.coords) {
        const city = await getCityFromCoords(
          userLocation.coords.lat,
          userLocation.coords.lng
        );
        setCity(city);
      }
    })();
  }, [userLocation?.coords]);

  return (
    <div className={styles.homeContainer}>
      <h2
        className="text-center my-0"
        style={{ backgroundColor: "#fdffcd", padding: "1rem" }}
      >
        {city
          ? `🍸🧉👨‍👩‍👧‍👦🙌Eventos destacados en ${city} hoy!🥳🍻🍹🎶`
          : `🍸🧉👨‍👩‍👧‍👦🙌Eventos destacados hoy!🥳🍻🍹🎶 Activa la geolocalización para ver eventos cerca tuyo`}
      </h2>

      {loading && <p className="text-center mt-4">Cargando eventos...</p>}
      {error && <p className="text-center text-danger mt-4">Error: {error}</p>}

      <div className={styles.gridContainer}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Home;
