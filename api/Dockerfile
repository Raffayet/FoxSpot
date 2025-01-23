# Use Alpine-based OpenJDK image
FROM openjdk:19-alpine

# Install dependencies
RUN apk add --no-cache bash curl unzip

# Set working directory
WORKDIR /com.example.foxspot

# Copy all project files
COPY . .

# Ensure gradlew has execute permissions
RUN chmod +x ./gradlew

# Set environment variables for Gradle
ENV GRADLE_HOME=/com.example.foxspot/gradle-6.5.1
ENV GRADLE_USER_HOME=/home/gradle
ENV GRADLE_OPTS="-Dorg.gradle.daemon=false"
ENV PATH="${GRADLE_HOME}/bin:${PATH}"

# Download and install Gradle
RUN curl -L https://services.gradle.org/distributions/gradle-6.5.1-bin.zip -o gradle-6.5.1-bin.zip \
    && unzip gradle-6.5.1-bin.zip \
    && rm gradle-6.5.1-bin.zip

# Clean and verify Gradle installation
RUN ./gradlew clean
RUN ./gradlew --version

# Default command
CMD ["./gradlew", "run", "--no-daemon"]
