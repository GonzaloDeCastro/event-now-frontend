import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./SideMenu.css";

const SideMenu = ({ isOpen, onClose }) => {
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
