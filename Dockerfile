FROM node:14
COPY package.json /back
RUN npm install
COPY package.json /front
RUN npm install
CMD ["npm","start"]
