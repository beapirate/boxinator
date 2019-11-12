FROM debian:10
# https://spring.io/guides/gs/spring-boot/ specifies JDK8 or later
# OpenJDK 8 package not available from Debian repos, use third party repo
# https://adoptopenjdk.net/installation.html#linux-pkg
RUN apt-get update && apt-get install -y curl software-properties-common
RUN apt-get install -y gnupg && \
    curl https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | apt-key add - && \
    add-apt-repository --yes https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/ && \
    apt-get update && \
    apt-get install -y adoptopenjdk-8-hotspot
RUN apt-get install -y gradle
# Packaged npm version is old enough to generate warnings about node version being unsupported
RUN mkdir /src
WORKDIR /src
COPY build.gradle /src/build.gradle
RUN gradle dependencies
COPY src/ src
COPY config/ config
RUN gradle --no-daemon assemble
EXPOSE 8080
CMD gradle --no-daemon bootRun
