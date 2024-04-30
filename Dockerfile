FROM node:slim
WORKDIR /counterApp
COPY . .
RUN npm ci
CMD ng build