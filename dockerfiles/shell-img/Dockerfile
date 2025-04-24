
# Use a small base image
FROM debian:trixie-slim

# Install only what you need for shell access
RUN apt-get update && apt-get install -y \
    bash \
    coreutils \
    iproute2 \
    iputils-ping \
    net-tools \
    curl \
    vim \
    procps \
    postgresql-client \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Default command
CMD ["/bin/bash"]
