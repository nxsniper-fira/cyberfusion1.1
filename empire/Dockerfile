FROM ubuntu:22.04
RUN apt-get update && apt-get install -y git python3-pip python3-venv python3-dev build-essential libssl-dev libffi-dev \
    libreadline-dev libsqlite3-dev wget curl unzip
RUN git clone --recursive https://github.com/BC-SECURITY/Empire.git /opt/empire
WORKDIR /opt/empire
RUN ./setup/install.sh --yes --accept-eula
EXPOSE 1337 5000
ENTRYPOINT ["./empire"]