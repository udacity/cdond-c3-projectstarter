#!/bin/bash

aws cloudformation deploy \
    --template-file ../files/cloudfront.yml \
    --stack-name InitialStack\
    --parameter-overrides WorkflowID=$RUN_ID