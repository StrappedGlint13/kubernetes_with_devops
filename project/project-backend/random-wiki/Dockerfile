FROM ubuntu:18.04

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y curl python 

COPY . . 

CMD [ "./todo.sh" ]