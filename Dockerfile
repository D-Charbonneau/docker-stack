FROM node:17.4.0

LABEL maintainer="Dallin Charbonneau" description="A simple docker image that hosts a website that recursively searches a folder" cohort=13 animal="bat"

WORKDIR /app

COPY . .

EXPOSE 8080

RUN npm install

CMD ["npm", "start"]
