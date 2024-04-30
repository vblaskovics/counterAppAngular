FROM node:slim
WORKDIR /counterAppAngular
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]