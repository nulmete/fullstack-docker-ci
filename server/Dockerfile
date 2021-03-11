FROM node:14-slim

# working directory
WORKDIR /usr/src/app

# copy dependencies to workdir
COPY ./package.json ./
COPY ./package-lock.json ./

# install dependencies
RUN npm install && npm install -g sequelize-cli

# copy rest of source code
COPY . .

EXPOSE 5000