FROM node:20.8.1-alpine
WORKDIR /usr/app
COPY . /usr/app
RUN npm i
RUN npm run build
CMD npm start