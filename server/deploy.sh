#!/bin/bash

echo What version should it be?
read VERSION

docker build -t alexmark/reddit-clone:$VERSION .
docker push alexmark/reddit-clone:$VERSION

ssh root@159.65.115.170 "docker pull alexmark/reddit-clone:$VERSION && docker tag alexmark/reddit-clone:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"

