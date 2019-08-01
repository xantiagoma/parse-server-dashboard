FROM node:lts-alpine
RUN apk update; \
  apk add git;
WORKDIR /tmp
COPY package*.json ./
RUN npm install
COPY . .
VOLUME [ "$HOME/cloud", "$HOME/.env", "/etc/letsencrypt/live/"]
ENV PARSE_ENV=dev
ENV APP_ID=appIdDefault
ENV APP_NAME=appNameDefault
ENV APP_DASHBOARD_ENDPOINT=/parse
ENV MASTER_KEY=secretMasterKeyDefault
ENV CLIENT_KEY=secretClientKeyDefault
ENV JS_KEY=secretJavascriptKeyDefault
ENV FILE_KEY=secretFileKeyDefault
ENV REST_KEY=secretRestAPIKeyDefault
ENV DOTNET_KEY=secretDotNetKeyDefault
ENV PARSE_PORT_DEV=3000
ENV DOMAIN=localhost
ENV USE_LIVEQUERY=true
ENV LIVEQUERY_CLASSES=
ENV USE_CLOUD_PATH=false
ENV DASHBOARD_USERS=admin,adminpass;user,userpass
ENV CLOUD_PATH=
ENV DB_URI=
ENV REDIS_URL=
EXPOSE 80 443 $PARSE_PORT_DEV

CMD [ "npm", "start" ]