#!/bin/bash

REVISION=$(echo $(git show --format=%H -s HEAD) | cut -c1-7)

docker build -t fabric8/launcher-creator-welcome-app:latest . 
docker tag fabric8/launcher-creator-welcome-app:latest fabric8/launcher-creator-welcome-app:$REVISION
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin 
docker push fabric8/launcher-creator-welcome-app:latest 
docker push fabric8/launcher-creator-welcome-app:$REVISION
