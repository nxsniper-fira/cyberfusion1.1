FROM python:3.10
RUN git clone https://github.com/s0md3v/XSStrike.git /opt/xsstrike
WORKDIR /opt/xsstrike
RUN pip install -r requirements.txt
ENTRYPOINT ["python", "xsstrike.py"]