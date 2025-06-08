import styles from "./Navbar.module.css";
import ProfileButton from "./ProfileButton";
import SearchInput from "./SearchInput";
import DateRangePicker from "./DateRangePicker";
import { FaFilter } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import FilterPanel from "./EventFilters";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";

const Navbar = ({ toggleMenu, isMenuOpen }) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterButtonRef = useRef(null);
  const [panelPosition, setPanelPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (showFilters && filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setPanelPosition({
        left: rect.left,
        top: rect.bottom - 28, // un poco de separación
      });
    }
  }, [showFilters]);

  return (
    <nav
      className={`d-flex align-items-center justify-content-between px-3 py-2 ${styles.navbar}`}
    >
      <div className="d-flex align-items-center gap-3 position-relative">
        <button onClick={toggleMenu} className={`btn ${styles.iconBtn}`}>
          {isMenuOpen ? <IoCloseSharp /> : <FaBars />}
        </button>
        <SearchInput />
        <DateRangePicker />
        <button
          ref={filterButtonRef}
          className={`btn ${styles.iconBtn}`}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <FaFilter />
        </button>

        {showFilters && (
          <div
            className="position-absolute"
            style={{
              left: panelPosition.left,
              top: panelPosition.top,
              zIndex: 1000,
            }}
          >
            <FilterPanel onClose={() => setShowFilters(false)} />
          </div>
        )}
      </div>

      <div className={styles.navbarRight}>
        <div style={{ position: "relative" }}>
          <FaBell
            style={{
              cursor: "pointer",
              color: "white",
              width: "22px",
              height: "22px",
            }}
          />
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.6rem" }}
          >
            3
          </span>
        </div>
        <ProfileButton />
      </div>
    </nav>
  );
};

export default Navbar;
