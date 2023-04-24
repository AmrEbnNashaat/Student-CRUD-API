# Use an official Node.js runtime as a parent image
FROM node:18.14-alpine

# Set the working directory to /app
# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY server.js /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Expose port 3000 for the server to listen on
EXPOSE 8080

# Start the app
CMD ["npm", "start"]