FROM node:9.11.2

LABEL maintainer="HatsuRebals"

# Create folder for application and change workdir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN chown -R 1000:1000 /usr/src/app

# Change user to node
USER 1000

RUN npm install && \
    npm run build && \
    npm run test

EXPOSE 3000
EXPOSE 9229

CMD ["npm", "run", "start"]