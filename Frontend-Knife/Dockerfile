FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install 

COPY . . 

RUN npm install -g angular-http-server
RUN npm install -g @angular/cli
RUN ng build --configuration release


# COPY ./dist .

WORKDIR /app/dist/knfc_frontend

CMD ["angular-http-server", "-p", "3013"]

# CMD ["tail", "-f", "/dev/null"]
