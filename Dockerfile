FROM nginx:1.21.0-alpine

COPY /nginx/default.conf /etc/nginx/conf.d/

RUN rm -Rf /usr/share/nginx/html/*

COPY /dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]