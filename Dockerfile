FROM node:10

ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}
ENV NODE_ENV=${NODE_ENV}

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

EXPOSE 9229

CMD [ "npm" , "run", "start:dev"]
