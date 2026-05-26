📝 Task Manager — Gestor de Tareas
Aplicación web de gestión de tareas desarrollada como proyecto final del curso de desarrollo web con React. Permite crear, visualizar, editar y eliminar tareas, con soporte para filtrado, ordenación y persistencia de datos en el navegador.

 Objetivo
Demostrar los conocimientos adquiridos durante el curso (HTML, CSS, JavaScript y React) mediante la construcción de una aplicación CRUD completa con una interfaz limpia, responsive y funcional.

 Funcionalidades

Crear tareas con título, descripción, prioridad, estado y fecha límite
Visualizar todas las tareas en formato lista o grid
Editar cualquier tarea desde un formulario pre-rellenado
Eliminar tareas con confirmación previa
Marcar como completada con cambio visual automático
Filtrar por estado (Pendiente / En Progreso / Completada) y por prioridad (Alta / Media / Baja)
Ordenar por fecha de creación, fecha límite, prioridad o título
Persistencia automática mediante localStorage


 Tecnologías utilizadas
TecnologíaUsoViteBuild tool y servidor de desarrolloReact 18+Framework principalCSSEstilos (módulos CSS / CSS puro)useStateGestión del estado de la aplicaciónuseEffectSincronización con localStoragelocalStoragePersistencia de datos en el navegador
Opcionales (si se utilizan)

React Router — navegación entre vistas
Context API — estado global
React Icons — iconografía
date-fns / Day.js — manejo de fechas
UUID — generación de IDs únicos


🗂️ Estructura del proyecto
src/
├── components/
│   ├── Header.jsx        # Cabecera y título de la app
│   ├── TaskForm.jsx      # Formulario para crear y editar tareas
│   ├── TaskList.jsx      # Contenedor de todas las tarjetas
│   ├── TaskCard.jsx      # Tarjeta individual de tarea
│   └── FilterBar.jsx     # Controles de filtrado y ordenación
├── App.jsx               # Componente raíz y lógica principal
├── main.jsx              # Punto de entrada
└── index.css             # Estilos globales

 Instalación y puesta en marcha
Requisitos previos

Node.js v18 o superior
npm v9 o superior (incluido con Node.js)

Pasos
bash# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd task-manager

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
La aplicación estará disponible en http://localhost:5173.
Scripts disponibles
ComandoDescripciónnpm run devInicia el servidor de desarrollonpm run buildGenera la versión de producción en /distnpm run previewPrevisualiza la build de producción

 Diseño responsive
La aplicación está adaptada para funcionar correctamente en: Portatiles/Tablet/Moviles

