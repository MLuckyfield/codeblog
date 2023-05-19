FROM node:14
WORKDIR /app
RUN cd /back && npm install
RUN cd /front && npm install
CMD ["npm","start"]
