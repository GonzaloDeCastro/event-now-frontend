# Event Now 🎉

**Event Now** es una aplicación web moderna que conecta a personas con eventos culturales, recreativos, académicos y de entretenimiento en su área. Inspirado en plataformas como Eventbrite o Mercado Libre, permite a usuarios explorar eventos de forma abierta y personalizada, ya sea desde un navegador o un dispositivo móvil.

---

## 🚀 Funcionalidades principales

- 🔍 Búsqueda abierta de eventos sin necesidad de registrarse
- 🎯 Filtros combinables por:
  - Categoría (música, taller, feria, teatro, etc.)
  - Fecha
  - Gratuito / Pago
  - Edad (todo público, 13+, 18+)
  - Tipo de ubicación (aire libre, cerrado)
- 🧾 Registro e inicio de sesión de usuarios
- ⭐ Guardar eventos como favoritos
- 🗓️ Historial y agenda personal de eventos
- 📝 Panel de creación de eventos para organizadores
- 💬 Sistema de reseñas y calificaciones
- 🛠️ Sistema de roles (usuario asistente, organizador particular, institución oficial)
- 🔐 Seguridad y validación para organizadores institucionales

---

## ⚙️ Tecnologías utilizadas

| Frontend                | Backend           | Base de Datos | Herramientas   |
| ----------------------- | ----------------- | ------------- | -------------- |
| React (Vite)            | Node.js (Express) | MySQL         | Redux Toolkit  |
| React Router            | JWT / Sessions    |               | Axios, Dotenv  |
| Bootstrap + CSS Modules |                   |               | SweetAlert2    |
| React Icons             |                   |               | UUID, Date-fns |

---

## 🧱 Arquitectura general

- 🔗 Navegación SPA con React Router DOM
- 📦 Manejo de estado global con Redux Toolkit
- 🧩 Componentes reutilizables y desacoplados
- 📁 Backend RESTful con Express
- 🔐 Seguridad con JWT y cookies HTTP-only (planificado)
- ☁️ Contenedores Docker para despliegue (planificado)

---

## 🧪 Estado actual

✅ Implementado:

- Home pública con navegación y filtros
- Sample data de eventos con filtrado en tiempo real
- Sistema de filtros combinables con checkboxes
- Menú lateral tipo burger con `react-burger-menu`
- Diseño responsivo con Bootstrap

🔜 Próximas features:

- Login/registro de usuarios
- Gestión de favoritos
- Vista detallada de cada evento
- Panel para organizadores
- Base de datos real + conexión backend
- Despliegue en Vercel/Render + PlanetScale/PlanetsQL

---

## 📷 Vista previa

> A incluir capturas de pantalla del home, menú burger, filtros y cards de eventos.

---

## 📦 Instalación local

```bash
git clone https://github.com/tuusuario/event-now.git
cd event-now
npm install
npm run dev
```
