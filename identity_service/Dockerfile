# # backend/Dockerfile
FROM openjdk:17-jdk-alpine
COPY target/identity-service-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]

# backend/Dockerfile
# FROM maven:3.8.5-openjdk-17 AS build
# COPY ..
# RUN maven clean package -DskipTests

# FROM openjdk:17.0.1-jdk-slim
# COPY --from=build /target/target/backend-0.0.1-SNAPSHOT.jar app.jar
# EXPOSE 5000
# ENTRYPOINT ["java", "-jar", "/app.jar"]
