import styles from "./Home.module.css";
import { sampleEvents } from "../redux/sampleEvents";
import EventCard from "../components/EventCard";
import { useSelector } from "react-redux";

const Home = () => {
  const {
    searchTerm,
    fromDate,
    toDate,
    category,
    isFree,
    ageRestriction,
    locationType,
  } = useSelector((state) => state.filters);

  const filteredEvents = sampleEvents
    .filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((event) => !fromDate || event.date >= fromDate)
    .filter((event) => !toDate || event.date <= toDate)
    .filter((event) => !category || event.category === category)
    .filter((event) => isFree === null || event.isFree === isFree)
    .filter(
      (event) => !ageRestriction || event.ageRestriction === ageRestriction
    )
    .filter((event) => !locationType || event.locationType === locationType);

  return (
    <div className={styles.homeContainer}>
      <h2
        className="text-center my-0"
        style={{ backgroundColor: "#fdffcd", padding: "1rem" }}
      >
        🍸🧉👨‍👩‍👧‍👦🙌Eventos destacados cerca tuyo hoy!🥳🍻🍹🎶
      </h2>

      <div className={styles.gridContainer}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Home;
