# Pull nginx base image
FROM nginx:latest
# FROM node

RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup | bash - && \
    apt-get -y install python build-essential nodejs

ADD . /var/www
WORKDIR /var/www

RUN npm install
RUN npm install webpack -g
RUN npm run package

# Expost port 80
EXPOSE 80

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static assets into var/www

# COPY ./node_modules /var/www/node_modules

# Start up nginx server
# CMD ["/bin/sh", "-c","nginx"]

CMD ["nginx"]