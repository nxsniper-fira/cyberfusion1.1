FROM python:3.10
RUN git clone https://github.com/laramies/theHarvester.git /opt/theharvester
WORKDIR /opt/theharvester
RUN pip install -r requirements/base.txt
ENTRYPOINT ["python", "theHarvester.py"]