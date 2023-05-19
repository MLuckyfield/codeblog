FROM node:14
WORKDIR /app
RUN cd /app/back && npm install
RUN cd /app/front && npm install
CMD ["npm","start"]
