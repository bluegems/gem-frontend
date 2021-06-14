# Build environment
FROM node:14.17-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_GEM_GRAPHQL_URI http://127.0.0.1:60195/graphql

COPY package.json ./
COPY yarn.lock ./

RUN yarn --silent
COPY . ./
RUN yarn build


# Production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
