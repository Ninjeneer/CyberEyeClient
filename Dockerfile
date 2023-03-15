# stage1 - build react app first 
FROM node:alpine as build
ARG VITE_REQUEST_SERVICE_URL
ARG VITE_REPORT_SERVICE_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_KEY

RUN echo $VITE_REQUEST_SERVICE_URL
RUN echo $VITE_REPORT_SERVICE_URL
RUN echo $VITE_SUPABASE_URL
RUN echo $VITE_SUPABASE_KEY

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn
COPY . /app
RUN ls -la
RUN yarn build

# stage 2 - build the final image and copy the react build files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
