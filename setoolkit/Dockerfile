FROM python:3.14.3-slim
RUN apt-get update && apt-get install -y git python3-pip build-essential python3-venv python3-setuptools
RUN git clone https://github.com/trustedsec/social-engineer-toolkit.git /opt/setoolkit
WORKDIR /opt/setoolkit
RUN pip3 install -r requirements.txt
EXPOSE 8087
ENTRYPOINT ["python3", "setoolkit"]