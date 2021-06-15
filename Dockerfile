# Build environment
FROM node:14.17-alpine as build
ARG REACT_APP_GEM_GRAPHQL_URI
ENV REACT_APP_GEM_GRAPHQL_URI=${REACT_APP_GEM_GRAPHQL_URI:-https://bluegems-backend.herokuapp.com/graphql}
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --silent
COPY . ./
RUN yarn build


# Production environment
FROM nginx:stable-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.2.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template
COPY --from=build /app/build /usr/share/nginx/html
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
