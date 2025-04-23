# 🚀 Getting Started

Estas instrucciones te guiarán para poner en marcha el proyecto en tu máquina local, tanto de forma nativa como con Docker.

---

## 🛠 Prerequisitos

- **Node.js** v18+ y npm
- **Docker** y **Docker Compose** (si vas a usar contenedores)
- (Opcional) `ts-node-dev` para recarga en caliente

---

## 📂 Instalación del proyecto

1. Clona el repositorio y entra en la rama principal:
   ```bash
   git clone https://github.com/sntwandy/coding-interview-backend-level-3.git
   cd coding-interview-backend-level-3
   ```

2. Instala las dependencias (solo producción):
   ```bash
   npm ci
   ```

---

## 🗄 Inicializar la base de datos

Este proyecto usa SQLite y crea el fichero `data/database.sqlite` automáticamente:

```bash
npm run db:init
```

- Crea la carpeta `data/` (si no existe).
- Genera el archivo `database.sqlite` en ella.
- Crea la tabla inicial de `items`.

---

## ▶️ Modo Producción (local)

1. Compila TypeScript a JavaScript:
   ```bash
   npm run build
   ```
2. Arranca el servidor:
   ```bash
   npm start
   ```
3. Prueba los endpoints:

   - **Health check**
     ```bash
     curl http://localhost:3000/ping
     # → { "ok": true }
     ```

   - **CRUD de items**
     | Método | Ruta                              | Descripción               |
     | ------ | --------------------------------- | ------------------------- |
     | POST   | `/items`                          | Crear un item             |
     | GET    | `/items`                          | Listar todos los items    |
     | GET    | `/items/:id`                      | Obtener item por ID       |
     | PUT    | `/items/:id`                      | Actualizar item por ID    |
     | DELETE | `/items/:id`                      | Borrar item por ID        |

---

## 🔄 Desarrollo en caliente (Docker + Hot-reloading)

1. Levanta el entorno de desarrollo:
   ```bash
   docker-compose up --build
   ```

2. Prueba:
   ```bash
   curl http://localhost:3000/ping
   # → { "ok": true }
   ```

3. Para detener:
   ```bash
   docker-compose down
   ```

---

## 📦 Docker (Producción)

1. Construye la imagen:
   ```bash
   docker build -f Dockerfile.prod -t backend-app .
   ```

2. Arranca el contenedor con volumen de datos:
   ```bash
   docker run -d      -p 3000:3000      -v "$(pwd)/data:/app/data"      --name backend-app      backend-app
   ```

3. Prueba el endpoint:
   ```bash
   curl http://localhost:3000/ping
   # → { "ok": true }
   ```

---

## 📑 Scripts disponibles

| Script                | Descripción                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `npm run db:init`     | Crea/actualiza `data/database.sqlite` con la tabla `items`.     |
| `npm run build`       | Compila TypeScript en `dist/`.                                   |
| `npm start`           | Arranca el servidor compilado (`dist/src/index.js`).             |
| `npm run dev`         | Levanta servidor en modo desarrollo con recarga en caliente.     |
| `npm run docker:up`   | `docker-compose up --build` (dev con recarga).                   |
| `npm run docker:down` | `docker-compose down` (detiene entorno de desarrollo).          |

---

¡Con esto tendrás toda la información necesaria para clonar, levantar y contribuir al proyecto sin fricciones!
