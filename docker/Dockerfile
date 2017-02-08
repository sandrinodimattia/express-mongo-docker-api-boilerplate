FROM mhart/alpine-node:6.9.1

RUN mkdir /app
WORKDIR /app

# Install yarn.
RUN apk update && \
  apk add --no-cache \
  alpine-sdk \
  bash \
  gnupg

RUN mkdir /opt /opt/yarn && \
  cd /opt/yarn && \
  wget https://yarnpkg.com/latest.tar.gz && \
  tar -zxf latest.tar.gz

ENV PATH "$PATH:/opt/yarn/dist/bin"

# Install nodemon
RUN yarn global add nodemon

# Install Node modules.
ADD ./package.json /app/package.json
RUN yarn install

# Listen
EXPOSE 3000

# Start the container
CMD [ "npm", "start" ]
