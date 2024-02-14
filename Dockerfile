FROM node:18.15-alpine as build

RUN apk add --no-cache git

WORKDIR /app

RUN nslookup github.com
RUN git clone https://github.com/Muzna-J/book-platform-client.git

WORKDIR /app/book-platform-client

ARG REACT_APP_PROTOCOL=http
ARG REACT_APP_HOSTNAME=localhost
ARG REACT_APP_PORT=5005

ENV REACT_APP_PROTOCOL=$REACT_APP_PROTOCOL \
    REACT_APP_HOSTNAME=$REACT_APP_HOSTNAME \
    REACT_APP_PORT=$REACT_APP_PORT

RUN npm ci --only=production 

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/book-platform-client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

