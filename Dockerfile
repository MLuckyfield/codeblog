FROM node:14
WORKDIR /app/front
COPY package.json package-lock.json ./front
RUN npm ci
COPY . ./front
RUN npm run build

WORKDIR /app/back
COPY package.json package-lock.json ./back
RUN npm ci

EXPOSE 5000
CMD ["npm","start"]
