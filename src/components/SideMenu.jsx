import { slide as Menu } from "react-burger-menu";
import "./SideMenu.css";
import { useSelector } from "react-redux";
import EventForm from "./EventForm";

const SideMenu = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Menu
      isOpen={isOpen}
      onClose={onClose}
      width={250}
      customBurgerIcon={false}
    >
      <a className="menu-item" href="/">
        🏠 Inicio
      </a>
      {!user ||
        (user.role == 2 && (
          <a className="menu-item" href="/my-created-events">
            🗓️ Eventos Creados
          </a>
        ))}
      {user && <EventForm onClose={onClose} />}
      <a className="menu-item" href="/favoritos">
        ⭐ Favoritos
      </a>
      <a className="menu-item" href="/agendados">
        🗓️ Agendados
      </a>
      <a className="menu-item" href="/historial">
        🕙 Historial
      </a>
      <a className="menu-item" href="/suscripciones">
        🗣️ Suscripciones
      </a>
    </Menu>
  );
};

export default SideMenu;
