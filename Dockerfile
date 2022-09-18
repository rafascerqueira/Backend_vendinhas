FROM node:16.17.0-alpine
LABEL version="1.0.0"
WORKDIR /usr/app
COPY . .
RUN yarn
EXPOSE 3001
CMD ["yarn", "migrate:dev"]