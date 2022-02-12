#!/bin/bash

source ../.env

aws s3api create-bucket --bucket $bucket_name \
    --acl public-read-write \
    --region us-west-2 \
    --create-bucket-configuration LocationConstraint=us-west-2

cp bucket-policy.json bucket-policy-fill.json
envsubst < bucket-policy.json > bucket-policy-fill.json

aws s3api put-bucket-policy --bucket $bucket_name --policy file://bucket-policy-fill.json
