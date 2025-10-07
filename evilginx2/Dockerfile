FROM golang:1.20 AS builder
RUN apt-get update && apt-get install -y git make
RUN git clone https://github.com/kgretzky/evilginx2.git /opt/evilginx2
WORKDIR /opt/evilginx2
RUN make

FROM debian:stable-slim
RUN apt-get update && apt-get install -y ca-certificates
COPY --from=builder /opt/evilginx2/bin/evilginx /usr/local/bin/evilginx
WORKDIR /opt/evilginx2
EXPOSE 53 80 443
ENTRYPOINT ["/usr/local/bin/evilginx"]