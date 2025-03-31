#!/bin/bash
echo "Clearing node_modules/.cache..."
rm -rf node_modules/.cache

echo "Clearing cache"
npm cache clean --force

echo "Removing build directory..."
rm -rf build

echo "Running npm install to ensure dependencies are up to date..."
npm install

echo "Building the application..."
npm run build

echo "Build completed"