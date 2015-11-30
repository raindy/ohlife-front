# Pull nginx base image
FROM nginx:latest
FROM node

ADD . /var/www/
WORKDIR /var/www
RUN npm install
RUN npm run package

RUN echo $PATH
ENV PATH /usr/local/nginx/bin:$PATH
RUN echo $PATH

# Expost port 80
EXPOSE 80

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static assets into var/www

# COPY ./node_modules /var/www/node_modules

# Start up nginx server
CMD ["nginx"]