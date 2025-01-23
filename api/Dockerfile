# Use a Debian-based image with JDK 17
FROM openjdk:17-slim

# Install required dependencies
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    libstdc++6 \
    zlib1g \
    && apt-get clean

# Set working directory
WORKDIR /com.example.foxspot

# Copy all project files
COPY . .

# Ensure gradlew has execute permissions
RUN chmod +x ./gradlew

# Set Java home and Gradle options
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"
ENV GRADLE_OPTS="-Dorg.gradle.java.home=/usr/lib/jvm/java-17-openjdk -Dorg.gradle.daemon=false -Dorg.gradle.parallel=false"

# Verify Gradle setup and clean build
RUN ./gradlew clean --no-daemon

# Set the default command
CMD ["./gradlew", "run", "--no-daemon", "--warning-mode=all"]
