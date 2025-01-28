# Stage 1: Build the application
FROM gradle:8.0-jdk17 AS build
WORKDIR /app

# Copy source code and Gradle files
COPY build.gradle.kts settings.gradle.kts gradlew ./
COPY gradle ./gradle
COPY src ./src

# Ensure gradlew is executable
RUN chmod +x gradlew

# Build the application without running tests
RUN ./gradlew bootJar --no-daemon -x test

# Stage 2: Create a minimal runtime image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the built Spring Boot JAR from the build stage
COPY --from=build /app/build/libs/app.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
