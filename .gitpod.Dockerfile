FROM gitpod/workspace-full

USER gitpod

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
# RUN sudo apt-get -q update && \
#     sudo apt-get install -yq bastet && \
#     sudo rm -rf /var/lib/apt/lists/*
#
RUN npm install -g @vue/cli
RUN npm install -g json-server

RUN npm install - g  apollo-server graphql
# More information: https://www.gitpod.io/docs/config-docker/
