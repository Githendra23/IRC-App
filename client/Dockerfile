FROM node:21-alpine

RUN npm install -g vite

WORKDIR /app

COPY package.json .

RUN npm install

COPY .. .

RUN npm i react-router-dom

RUN npm i axios

RUN npm i react-toastify

RUN npm install @react-three/fiber

RUN npm install @react-three/drei

RUN npm install maath

EXPOSE 5173

CMD ["vite", "--host", "0.0.0.0"]