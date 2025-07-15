# Etapa 1: Construcción
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiamos el build a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
