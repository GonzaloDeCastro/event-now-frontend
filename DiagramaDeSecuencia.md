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
```

```mermaid
sequenceDiagram
    participant Usuario as Usuario
    participant UI as Interfaz (Sitio / App)
    participant Controlador as ControladorRegistro
    participant BD as Base de Datos

    %% Flujo principal
    Usuario->>UI: Clic en “Registrarse”
    UI->>Controlador: Mostrar formulario de registro
    Usuario->>UI: Completa campos obligatorios
    UI->>Controlador: Enviar datos del formulario
    Controlador->>BD: Validar datos
    alt Datos válidos
        Controlador->>BD: Crear nuevo usuario
        BD-->>Controlador: Confirmación de creación
        Controlador-->>UI: Mostrar mensaje de registro exitoso
    else Datos inválidos
        Controlador-->>UI: Mostrar mensaje de error
        Usuario->>UI: Corrige los campos
        UI->>Controlador: Reenvía datos
        Controlador->>BD: Validar datos nuevamente
        opt Datos ahora válidos
            Controlador->>BD: Crear nuevo usuario
            BD-->>Controlador: Confirmación de creación
            Controlador-->>UI: Mostrar mensaje de registro exitoso
        end
    end

    %% Alternativa: Usuario cancela el registro
    alt El usuario cierra el formulario
        Usuario->>UI: Cierra formulario de registro
        note over UI: Registro cancelado, fin del caso de uso
    end
