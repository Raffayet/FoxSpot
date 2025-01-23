# Use Alpine-based OpenJDK image
FROM openjdk:19-alpine

# Install dependencies: curl and unzip
RUN apk add --no-cache bash curl unzip

# Set working directory
WORKDIR /com.example.foxspot

# Copy all project files into the container
COPY . .

# Ensure gradlew has execute permissions
RUN chmod +x ./gradlew

# Download and install Gradle
RUN curl -L https://services.gradle.org/distributions/gradle-6.5.1-bin.zip -o gradle-6.5.1-bin.zip \
    && unzip gradle-6.5.1-bin.zip \
    && rm gradle-6.5.1-bin.zip

# Set environment variables for Gradle
ENV GRADLE_HOME=/com.example.foxspot/gradle-6.5.1
ENV PATH="${GRADLE_HOME}/bin:${PATH}"

# Verify Gradle installation
RUN ./gradlew --version

# Set the default command
CMD ["./gradlew", "run"]
