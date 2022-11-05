FROM node:18

# Create app directory
WORKDIR /usr/src/web

# Install app dependencies
COPY --chown=node:node package*.json ./

RUN npm install --global npm@8.19.2 && npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 5173
