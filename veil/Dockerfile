FROM ubuntu:22.04
RUN apt-get update && apt-get install -y git python3-pip wine winbind mingw-w64 metasploit-framework
RUN git clone https://github.com/Veil-Framework/Veil.git /opt/veil
WORKDIR /opt/veil
RUN ./config/setup.sh --force --silent
EXPOSE 8888
ENTRYPOINT ["./Veil.py"]