FROM node:14-slim

# working directory
WORKDIR /usr/src/app

# copy dependencies to workdir
COPY ./package.json ./
COPY ./package-lock.json ./

# install dependencies
RUN npm install

# copy rest of source code
COPY . .

EXPOSE 3000

ENV REACT_APP_BASE_URL=http://localhost:5000/api

CMD [ "npm", "start" ]