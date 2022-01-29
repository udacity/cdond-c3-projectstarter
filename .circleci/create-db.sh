#!/bin/bash

export db_name="udapeople-$RUN_ID"

aws rds create-db-instance \
    --db-instance-identifier ${db_name} \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username postgres \
    --master-user-password czateny7r9zcwkaubdp5j \
    --port 5432 \
    --publicly-accessible \
    --no-multi-az \
    --allocated-storage 20