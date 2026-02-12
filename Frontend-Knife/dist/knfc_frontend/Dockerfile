FROM node:19-alpine

RUN npm install -g angular-http-server

WORKDIR /app

COPY . .

CMD ["angular-http-server", "-p", "3010"]
