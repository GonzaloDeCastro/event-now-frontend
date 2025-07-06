```mermaid
sequenceDiagram
    participant Usuario as Usuario Asistente
    participant UI as Sitio / Aplicación
    participant Controlador as ControladorExploracionEventos
    participant BD as Base de Datos

    %% Flujo principal
    Usuario->>UI: Accede al sitio o aplicación
    UI->>Controlador: Solicita eventos destacados
    Controlador->>BD: Obtener eventos destacados
    BD-->>Controlador: Lista de eventos
    Controlador-->>UI: Muestra eventos destacados y filtros

    Usuario->>UI: Aplica filtros (categoría, ubicación, fecha)
    UI->>Controlador: Solicita eventos filtrados
    Controlador->>BD: Buscar eventos según filtros
    BD-->>Controlador: Resultados filtrados
    Controlador-->>UI: Muestra eventos filtrados

    Usuario->>UI: Visualiza detalle de un evento
    UI->>Controlador: Solicita detalle del evento
    Controlador->>BD: Obtener datos del evento
    BD-->>Controlador: Datos del evento
    Controlador-->>UI: Muestra detalle del evento

    %% Alternativa
    alt No hay eventos disponibles
        BD-->>Controlador: Lista vacía
        Controlador-->>UI: Mostrar mensaje “No hay eventos disponibles por el momento”
    end
