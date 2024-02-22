FROM python:3.10
RUN ln -s /usr/bin/pip3 /usr/bin/pip
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
