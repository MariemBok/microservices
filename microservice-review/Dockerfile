# Use an official Maven image as a build stage
FROM maven:3.8.4-openjdk-11-slim AS build
WORKDIR /app

# Copy the Maven project file
COPY pom.xml .

# Download dependencies and build application
RUN mvn clean install -DskipTests

# Copy the application files
COPY src ./src

# Create the final image with the built JAR
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/target/your-spring-boot-app.jar .

# Expose the port that the application will run on
EXPOSE 9084

# Specify the command to run on container startup
CMD ["java", "-jar", "your-spring-boot-app.jar"]
