FROM python:3.14.2-slim
RUN pip install flask requests
COPY app.py /app/app.py
WORKDIR /app
EXPOSE 80
ENTRYPOINT ["python", "app.py"]