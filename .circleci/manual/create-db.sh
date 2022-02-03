#!/bin/bash

# https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-vpcs.html
export VPC_ID=$(aws ec2 describe-vpcs | jq .Vpcs[0].VpcId -r)

# https://docs.aws.amazon.com/cli/latest/userguide/cli-services-ec2-sg.html

if `aws ec2 create-security-group --group-name db-postgress-open --description "db postgress open" --vpc-id $VPC_ID` ; then
    echo "waiting to create Security Group"

    export SG_ID=$(aws ec2 describe-security-groups --group-name db-postgress-open | jq .SecurityGroups[0].GroupId -r)
    aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 5432 --cidr 0.0.0.0/0
else
    echo "Security group probably already exists"
    export SG_ID=$(aws ec2 describe-security-groups --group-name db-postgress-open | jq .SecurityGroups[0].GroupId -r)
fi

# https://docs.aws.amazon.com/cli/latest/reference/rds/create-db-instance.html
aws rds create-db-instance \
    --db-name postgress \
    --db-instance-identifier ${db_name} \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username postgres \
    --master-user-password czateny7r9zcwkaubdp5j \
    --port 5432 \
    --publicly-accessible \
    --vpc-security-group-ids $SG_ID \
    --no-multi-az \
    --allocated-storage 20