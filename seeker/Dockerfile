FROM python:3.14.2-slim
RUN apt-get update && apt-get install -y git php wget
RUN git clone https://github.com/thewhiteh4t/seeker.git /opt/seeker
WORKDIR /opt/seeker
RUN pip install -r requirements.txt
EXPOSE 8081
ENTRYPOINT ["python3", "seeker.py", "-s", "-p", "8081"]