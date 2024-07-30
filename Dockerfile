FROM node:20.11.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run migration:run:prod
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
