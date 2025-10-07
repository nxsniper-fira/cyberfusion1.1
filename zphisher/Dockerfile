FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y git curl php openssh-client
RUN git clone --depth=1 https://github.com/htr-tech/zphisher.git /opt/zphisher
WORKDIR /opt/zphisher
RUN chmod +x zphisher.sh
EXPOSE 8084
ENTRYPOINT ["bash", "zphisher.sh"]