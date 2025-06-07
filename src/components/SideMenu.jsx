import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./SideMenu.css"; // Estilos obligatorios para el plugin

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <Menu
      isOpen={isOpen}
      onClose={onClose}
      width={280}
      className="bm-menu-wrap"
      customBurgerIcon={false}
    >
      <a className="menu-item" href="/">
        Inicio
      </a>
      <a className="menu-item" href="/favoritos">
        Favoritos
      </a>
      <a className="menu-item" href="/agendados">
        Agendados
      </a>
      <a className="menu-item" href="/historial">
        Historial
      </a>
      <a className="menu-item" href="/suscripciones">
        Suscripciones
      </a>
    </Menu>
  );
};

export default SideMenu;
