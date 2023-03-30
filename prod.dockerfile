FROM node:16-slim AS builder

# Public variables are only required at build time.
ARG NEXT_PUBLIC_GIT_BRANCH
ARG NEXT_PUBLIC_GIT_TAG
ARG NEXT_PUBLIC_AUTH_ENDPOINT
ARG NEXT_PUBLIC_AUTH_CLIENT_ID
ARG NEXT_PUBLIC_OW4_ADDRESS
ARG NEXT_PUBLIC_SENTRY_DSN

ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR $WORKDIR

# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md
# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build
RUN yarn --production

FROM node:16-slim

# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md
RUN apt update \
    && apt install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt update \
    && apt install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Add user so we don't need --no-sandbox.
# same layer as npm install to keep re-chowned files from using up several hundred MBs more space
RUN groupadd -r pptruser \
    && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# Run everything after as non-privileged user.
USER pptruser

LABEL maintainer="utvikling@online.ntnu.no"

ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR $WORKDIR

COPY --from=builder $WORKDIR/node_modules ./node_modules
COPY --from=builder $WORKDIR/.next ./.next
COPY --from=builder $WORKDIR/src ./src
COPY --from=builder $WORKDIR/public ./public
COPY --from=builder $WORKDIR/next.config.js ./next.config.js
COPY --from=builder $WORKDIR/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start", "--hostname", "0.0.0.0"]