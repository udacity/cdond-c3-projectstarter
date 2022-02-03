#!/bin/bash

aws cloudformation deploy \
  --template-file files/prometheus.yml \
  --stack-name "prometheus" \
  --parameter-overrides ID="1"