FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./front
RUN npm install
COPY package.json package-lock.json ./back
RUN npm install
CMD ["npm","start"]
