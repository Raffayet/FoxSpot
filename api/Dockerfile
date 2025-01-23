FROM openjdk:19-alpine

RUN apt-get install -y unzip

RUN apk add --no-cache bash

WORKDIR /com.example.foxspot

RUN curl -L https://services.gradle.org/distributions/gradle-6.5.1-bin.zip -o gradle-6.5.1-bin.zip
RUN unzip gradle-6.5.1-bin.zip
ENV GRADLE_HOME=/app/gradle-6.5.1
ENV PATH=$PATH:$GRADLE_HOME/bin
RUN gradle --version

CMD ./gradlew run