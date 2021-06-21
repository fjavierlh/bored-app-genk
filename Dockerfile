FROM node:16-alpine3.12 as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build


FROM nginx:1.21.0-alpine
COPY /nginx/default.conf /etc/nginx/conf.d/
RUN rm -Rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]