FROM python:3.8-slim
RUN apt-get update && apt-get install -y git python3-dev python3-pip build-essential
RUN git clone --recursive https://github.com/n1nj4sec/pupy.git /opt/pupy
WORKDIR /opt/pupy
RUN pip install -r requirements.txt
EXPOSE 443 80 8080
ENTRYPOINT ["python3", "pupysh.py"]