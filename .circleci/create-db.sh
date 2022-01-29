#!/bin/bash

export db_name="udapeople-$RUN_ID"

export VPC_ID=$(aws ec2 describe-vpcs | jq .Vpcs[0].VpcId -r)

export SG_ID=$(aws ec2 create-security-group --group-name db-postgress-open --description "db postgress open" --vpc-id $VPC_ID | jq .GroupId -r)

aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 5432 --cidr 0.0.0.0/0

aws rds create-db-instance \
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