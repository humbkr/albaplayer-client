FROM debian:latest

RUN apt-get update

# Curl
RUN apt-get install -y curl

# Gnupg
RUN apt-get install -y gnupg2

# Git
RUN apt-get install -y git

# ZIP
RUN apt-get install -y zlib1g zlib1g-dev

# Vim
RUN apt-get install -y vim

# Create aliases
RUN echo 'alias ll="ls -lah"' >> ~/.bashrc
RUN echo 'alias vi="vim"' >> ~/.bashrc

# Nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

# Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

# Clean apt-get cache
RUN apt-get clean all -y && apt-get autoclean -y

RUN mkdir /app
