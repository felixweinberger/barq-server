# Load node server
FROM node:11

# Change working dir to /app
WORKDIR /app

# Add files from current to /app
COPY package.json /app/package.json

# Install node packages
RUN npm install --silent

# Add source files
COPY . .

# Run the build
CMD [ "npm", "start" ];

# Expose the port
EXPOSE 3000
