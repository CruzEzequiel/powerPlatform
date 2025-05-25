## Plataforma de Monitoreo - Frontend (Next.js)

### 📦 Requisitos

* Node.js 18+
* npm o yarn
* Proyecto de Firebase con Identity Platform habilitado

### 🔐 Firebase

Este proyecto utiliza **Firebase Authentication** mediante **Identity Platform** como sistema de inicio de sesión. Para su funcionamiento:

1. Debes crear un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Habilitar **Identity Platform**.
3. Activar el método de autenticación por correo electrónico y contraseña.
4. Crear un archivo `.env` con las claves del proyecto (ver `.env.example`).

### 🗂️ Estructura General

```bash
📁src
├── 📁app
│   ├── 📁(auth)
│   │   └── 📁login
│   │       ├── 📁components
│   │       ├── 📁usecases
│   │       ├── 📁view
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── 📁(default)
│   │   ├── 📁dashboard
│   │   │   ├── 📁components
│   │   │   ├── 📁usecases
│   │   │   ├── 📁utils
│   │   │   ├── 📁view
│   │   │   └── page.tsx
│   │   └── 📁layout
│   │       ├── 📁components
│   │       └── layout.tsx
│   ├── 📁context
│   │   └── 📁authContext
│   ├── favicon.ico
│   ├── globals.css
├── 📁infrastructure
│   ├── 📁api
│   └── 📁services
├── middleware.ts
```

---

### ▶️ Cómo Ejecutar

1. Instala las dependencias:

```bash
npm install
# o
yarn install
```

2. Crea el archivo `.env` con las claves de Firebase:

```bash
cp .env.example .env
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en: `http://localhost:3000`

## Atajos
se incluye un script para construir en docker solo ejecuta  'sudo ./docker_run.sh'

---

Este frontend consume datos desde una API protegida con Firebase, y permite visualizar estaciones de carga eléctricas tanto en modo **dashboard** como en lista.
