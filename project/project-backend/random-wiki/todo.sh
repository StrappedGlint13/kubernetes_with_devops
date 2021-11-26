#!/bin/sh

content=$(curl -L https://en.wikipedia.org/wiki/Special:Random | sed -n 's/.*href="\([^"]*\).*/\1/p' | grep 'https://en.wikipedia.org/wiki/')

echo $content

curl 'http://todos-backend:80/api' \
  -X POST \
  -H 'content-type: application/json' \
  --data '{
    "query":"mutation { addTodo(name: \"'$content'\"){name}}"
}' 