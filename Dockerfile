# Load node server
FROM node:11

# Change working dir to /app
WORKDIR /app

# Add files from current to /app
COPY package.json /app/package.json

# Install node packages
RUN npm install --silent

# Install netcat so wait-for.sh can be used for checking mySQL readiness
RUN apt-get update && apt-get install -y netcat

# Copy all other server files
COPY . .

# Run the build
CMD [ "npm", "start" ];

# Expose the port
EXPOSE 3000
