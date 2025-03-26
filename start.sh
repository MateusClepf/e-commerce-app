#!/bin/bash

echo "Starting E-Commerce application with Docker Compose..."
docker-compose -f docker/docker-compose.yml up -d

echo "Application is running!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000"
echo ""
echo "To stop the application, run: docker-compose -f docker/docker-compose.yml down"