FROM python:3.14.3-slim
RUN apt-get update && apt-get install -y git python3-pip
RUN pip3 install poetry
RUN git clone https://github.com/Porchetta-Industries/CrackMapExec.git /opt/cme
WORKDIR /opt/cme
RUN poetry install
ENTRYPOINT ["poetry", "run", "cme"]