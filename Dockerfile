# Pull nginx base image
FROM nginx:latest
FROM node

ADD . /var/www
WORKDIR /var/www

RUN npm install
RUN npm run package



ENV PATH /usr/local/nginx/sbin:/usr/sbin/:/usr/sbin/nginx:/usr/sbin/nginx/bin:/usr/sbin/nginx/sbin:$PATH

# Expost port 80
EXPOSE 80

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static assets into var/www

# COPY ./node_modules /var/www/node_modules

# Start up nginx server
CMD ["/bin/sh", "-c","nginx"]