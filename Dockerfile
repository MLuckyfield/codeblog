FROM node:14
WORKDIR /app
RUN mkdir front && cd front
COPY /front/package.json /front/package-lock.json .

WORKDIR /app/front
RUN npm ci
COPY /front* ./front
RUN npm run build

WORKDIR /app
COPY /back/package.json /back/package-lock.json ./back
WORKDIR /app/back
RUN npm ci

EXPOSE 5000
CMD ["npm","start"]
