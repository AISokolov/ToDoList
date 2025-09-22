# Use an OpenJDK base image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY mvnw mvnw.cmd pom.xml ./
COPY .mvn/ .mvn/

# Give execution rights to mvnw
RUN chmod +x mvnw

# Copy the source code
COPY src/ ./src/

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the port
EXPOSE 8081

# Run the application
CMD ["java", "-jar", "target/ToDoListBackEnd-0.0.1-SNAPSHOT.jar"]