FROM debian:10
RUN apt-get update
RUN apt-get install -y nodejs npm
# Packaged npm version is old enough to generate warnings about node version being unsupported
RUN npm install -g npm@latest && apt-get remove -y npm
RUN mkdir /src
WORKDIR /src
COPY package.json /src/
RUN npm install
COPY components/ /src/components
COPY util/ /src/util
COPY reducers/ /src/reducers
COPY static/ /src/static
COPY index.js actions.js .babelrc webpack.config.js /src/
RUN find /src | grep -v node_modules
RUN npm run-script build
CMD npx webpack --watch
