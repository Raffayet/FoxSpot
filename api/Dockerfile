# Use a multi-stage build
# Stage 1: Build the application
FROM gradle:8.0-jdk17 AS build
WORKDIR /app

# Copy source code and Gradle files
COPY build.gradle.kts settings.gradle.kts gradlew ./
COPY gradle ./gradle
COPY src ./src

# Build the application
RUN ./gradlew build --no-daemon

# Stage 2: Create a minimal runtime image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the built jar from the previous stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
