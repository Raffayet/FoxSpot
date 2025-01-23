# Use a Debian-based image for better compatibility
FROM openjdk:19-slim

# Install dependencies
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

# Disable Gradle Daemon and parallel execution
ENV GRADLE_OPTS="-Dorg.gradle.daemon=false -Dorg.gradle.parallel=false"

# Verify Gradle setup and clean build
RUN ./gradlew clean --no-daemon

# Set the default command
CMD ["./gradlew", "run", "--no-daemon", "--warning-mode=all"]
