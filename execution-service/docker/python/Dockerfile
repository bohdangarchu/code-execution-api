# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster
WORKDIR /app

RUN mkdir src

COPY . .

ENTRYPOINT ["python3", "main.py"]
