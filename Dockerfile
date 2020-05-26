FROM node:10

ENV PORT=${PORT}

# Set the working directory
WORKDIR /app

# Copy project specification and dependencies lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app sources
COPY . .

# Expose application port
EXPOSE ${PORT}

CMD [ "npm" , "run", "start:prod"]
