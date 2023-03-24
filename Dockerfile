FROM node:16-alpine

#RUN mkdir -p /user/app/
WORKDIR /

COPY ./ ./
RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm","start" ]