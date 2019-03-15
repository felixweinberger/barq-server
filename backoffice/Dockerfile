# Load node server
FROM node:11

# Change working dir to /app
WORKDIR /backoffice

# Add files from current to /app
COPY package.json /backoffice/package.json

# Install node packages
RUN npm install

# Add source files
COPY . .

# Run the build
CMD [ "npm", "start" ];

# Expose the port
EXPOSE 3000
