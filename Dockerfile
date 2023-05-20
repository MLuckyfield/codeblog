FROM node:14
WORKDIR /app
RUN mkdir front && cd front
COPY /front/package.json /front/package-lock.json .

WORKDIR /app/front
RUN npm ci
COPY /front* ./front
RUN npm --prefix front run build

WORKDIR /app
RUN mkdir back && cd back
COPY /back/package.json /back/package-lock.json .
WORKDIR /app/back
RUN npm ci

EXPOSE 5000
CMD ["npm","start"]
