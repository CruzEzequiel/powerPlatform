#!/bin/bash

APP_NAME="nextjs-dynamic"
PORT=3000

echo "🛠️  Construyendo imagen Docker para $APP_NAME..."
docker build -t $APP_NAME .

echo "🧹 Eliminando contenedor anterior si existe..."
docker rm -f $APP_NAME 2>/dev/null || true

echo "🚀 Iniciando contenedor '$APP_NAME' en http://localhost:$PORT ..."
docker run -d --name $APP_NAME -p $PORT:$PORT $APP_NAME
