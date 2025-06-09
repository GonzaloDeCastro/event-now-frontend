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
import { useSelector } from "react-redux";

const Navbar = ({ toggleMenu, isMenuOpen, onLoginClick, onRegisterClick }) => {
  const { user } = useSelector((state) => state.auth);
  const [showFilters, setShowFilters] = useState(false);
  const filterButtonRef = useRef(null);
  const [panelPosition, setPanelPosition] = useState({ left: 0, top: 0 });
  const filterPanelRef = useRef(null);
  useEffect(() => {
    if (showFilters && filterButtonRef.current) {
      // Calcular posición del panel
      const rect = filterButtonRef.current.getBoundingClientRect();
      setPanelPosition({
        left: rect.left,
        top: rect.bottom - 28, // un poco de separación
      });

      // Handler para cerrar si se hace clic afuera
      const handleClickOutside = (event) => {
        if (
          filterButtonRef.current &&
          filterPanelRef.current &&
          !filterButtonRef.current.contains(event.target) &&
          !filterPanelRef.current.contains(event.target)
        ) {
          setShowFilters(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showFilters]);

  return (
    <nav
      className={`d-flex align-items-center justify-content-between px-3 py-2 ${
        user && user.userType == 2 ? styles.navbarOrganizer : styles.navbar
      } `}
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
            ref={filterPanelRef}
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
        <ProfileButton
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;
