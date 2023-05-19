FROM node:14
COPY . /back
COPY . /front
RUN cd back && npm install
RUN cd front && npm install
CMD ["npm","start"]
