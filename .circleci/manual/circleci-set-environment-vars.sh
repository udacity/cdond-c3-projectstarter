#!/bin/bash

export CIRCLE_TOKEN=""

curl -X POST --header "Content-Type: application/json" -d '{"name":"foo", "value":"bar"}' \
    https://circleci.com/api/v1.1/project/:vcs-type/:username/:project/envvar -H "Circle-Token: $CIRCLE_TOKEN"
