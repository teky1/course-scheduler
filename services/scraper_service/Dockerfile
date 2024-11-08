FROM python:3.9-alpine

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code

RUN crontab /code/cron.txt
RUN mkdir /code/logs
RUN touch /code/logs/out.log /code/logs/err.log 

RUN chmod +x /code/entry.sh

ENTRYPOINT ["/code/entry.sh"]