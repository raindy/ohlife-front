# Pull nginx base image
FROM nginx:latest

# Expost port 80
EXPOSE 80

# Copy custom configuration file from the current directory
ADD nginx.conf /etc/nginx/nginx.conf
ADD nginx.conf /usr/share/nginx/conf/nginx.conf

# Copy static assets into var/www
ADD ./build /var/www
# COPY ./node_modules /var/www/node_modules

# Start up nginx server
CMD ["nginx"]