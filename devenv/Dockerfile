FROM debian:10
RUN apt-get update
RUN apt-get install -y nodejs npm curl
# https://spring.io/guides/gs/spring-boot/ specifies JDK8 or later
# OpenJDK 8 package not available from Debian repos, use third party repo
# https://adoptopenjdk.net/installation.html#linux-pkg
RUN apt-get install -y software-properties-common && \
    curl https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | apt-key add - && \
    add-apt-repository --yes https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/ && \
    apt-get update && \
    apt-get install -y adoptopenjdk-8-hotspot
RUN apt-get install -y gradle
# Packaged npm version is old enough to generate warnings about node version being unsupported
RUN npm install -g npm@latest && apt-get remove -y npm
RUN mkdir /src
WORKDIR /src
EXPOSE 8080
CMD /bin/bash
