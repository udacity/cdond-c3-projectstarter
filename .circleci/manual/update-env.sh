#!/bin/bash

source ../.env

export RDS_HOST=$(aws rds describe-db-instances --db-instance-identifier ${db_name} | jq -r .DBInstances[0].Endpoint.Address)

echo "Addind RDS_HOST to CircleCI: $RDS_HOST"
curl -X POST --header "Content-Type: application/json" -d "{\"name\":\"TYPEORM_HOST\", \"value\":\"$RDS_HOST\"}" \
    https://circleci.com/api/v1.1/project/github/ovimihai/cdond-c3-projectstarter/envvar -H "Circle-Token: $CIRCLE_TOKEN"
