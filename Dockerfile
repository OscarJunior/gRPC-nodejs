FROM node:10

# Set the working directory
WORKDIR /app

# Copy project specification and dependencies lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app sources
COPY . .

# Expose application port
EXPOSE $CONTAINER_PORT

# Debugger application port
EXPOSE 9229
