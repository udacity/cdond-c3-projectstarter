#!/bin/bash

source ../.env

echo "Searching Cloudfront stacks"
for i in $(aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE CREATE_IN_PROGRESS ROLLBACK_COMPLETE ROLLBACK_IN_PROGRESS | jq .StackSummaries[].StackId -r); do
    echo "delete stack $i"
    aws cloudformation delete-stack --stack-name $i || echo "Already delted"
done

echo "Searching RDS instances"
for i in $(aws rds describe-db-instances | jq .DBInstances[].DBInstanceIdentifier -r); do
    echo "delete RDS instance $i"
    aws rds delete-db-instance --skip-final-snapshot --db-instance-identifier $i || echo "Already deleted"
done

echo "Empty S3 bucket $bucket_name"
if aws s3 ls | grep $bucket_name; then
    aws s3 rm s3://$bucket_name --recursive
fi
echo "Delete S3 bucket $bucket_name"
aws s3api delete-bucket --bucket $bucket_name || echo "Bucket inexistent"