FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y git php curl openssh-client
RUN git clone https://github.com/An0nUD4Y/blackeye.git /opt/blackeye
WORKDIR /opt/blackeye
RUN chmod +x blackeye.sh
EXPOSE 8086
ENTRYPOINT ["bash", "blackeye.sh"]