# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.9.0
ARG PNPM_VERSION=8.15.6

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as build

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

################################################################################
# Create a stage for installing production dependecies.

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    # --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    # --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install


COPY . .
# Run the build script.
RUN pnpm build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM nginx:stable-alpine as final

# Use production node environment by default.

# 配置spa应用的nginx配置
RUN cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen 80;
    root /usr/share/nginx/html;

    index index.html;
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # 转发 /api 请求到本地8080端口
    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        # 重写路径去掉 /api
        rewrite ^/api(.*)\$ \$1 break;
    }
}
EOF

COPY --from=build /usr/src/app/dist /usr/share/nginx/html


# Expose the port that the application listens on.
EXPOSE 80

# Run the application.
CMD ["nginx", "-g", "daemon off;"]