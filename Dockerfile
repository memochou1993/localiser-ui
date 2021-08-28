# build stage
FROM node:lts-alpine as builder

WORKDIR /var/www

COPY . .

RUN yarn install
RUN yarn build --mode production

# final stage
FROM nginx:stable-alpine

COPY --from=builder /var/www/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
