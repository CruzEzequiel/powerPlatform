# Usamos una imagen base de Node.js con Alpine
FROM node:18-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero para aprovechar el caché de Docker
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos del proyecto
COPY . .

# Construimos el proyecto de Next.js
RUN npm run build

# Exponemos el puerto 3000 (puerto por defecto de Next.js)
EXPOSE 3000

# Iniciamos la aplicación en modo producción usando next start
CMD ["npm", "run", "start"]
