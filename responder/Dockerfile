FROM python:3.8-slim
RUN apt-get update && apt-get install -y git python3-pip
RUN git clone https://github.com/lgandx/Responder.git /opt/responder
WORKDIR /opt/responder
EXPOSE 88 137 138 139 445 5355 53 80 443
ENTRYPOINT ["python3", "Responder.py", "-I", "eth0"]