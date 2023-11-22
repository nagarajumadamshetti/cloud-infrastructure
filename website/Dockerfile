# pull official base image
FROM node AS builder

# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./

# Installs all node packages
RUN npm install 

RUN npm install react-scripts@3.0.1 -g --silent

# Copies everything over to Docker environment
COPY . ./
RUN npm run build --silent

#Stage 2
#######################################
#pull the official nginx:1.19.0 base image
FROM nginx:1.19.0
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html


# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
