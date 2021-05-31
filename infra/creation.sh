#!/bin/bash
CFN_NAME=udacity-network ; aws cloudformation create-stack --stack-name $CFN_NAME --template-body file://network.yml --parameters file://network-properties.json --capabilities "CAPABILITY_IAM" "CAPABILITY_NAMED_IAM"
CFN_NAME=udacity-sg ; aws cloudformation create-stack --stack-name $CFN_NAME --template-body file://sg.yml
CFN_NAME=udacity-rds ; aws cloudformation create-stack --stack-name $CFN_NAME --template-body file://rds.yml --parameters  ParameterKey=RDSPassword,ParameterValue=securepassword
  

##Udacity
RANDOMID=dg2fft5w25j6gfah2; CFN_NAME=udacity-backend-$RANDOMID ;    aws cloudformation create-stack --stack-name $CFN_NAME --template-body file://backend.yml --parameters  ParameterKey=ID,ParameterValue=$RANDOMID
RANDOMID=dg2fft5w25j6gfah2; CFN_NAME=udacity-frontend-$RANDOMID ;   aws cloudformation create-stack --stack-name $CFN_NAME --template-body file://frontend.yml --parameters  ParameterKey=ID,ParameterValue=$RANDOMID
RANDOMID=dg2fft5w25j6gfah2; CFN_NAME=udacity-cloudfront-$RANDOMID;  aws cloudformation create-stack --stack-name $CFN_NAME --template-body file://cloudfront.yml --parameters  ParameterKey=WorkflowID,ParameterValue=$RANDOMID

CFN_NAME=udacity-network ; aws cloudformation update-stack --stack-name $CFN_NAME --template-body file://network.yml --parameters file://network-properties.json --capabilities "CAPABILITY_IAM" "CAPABILITY_NAMED_IAM"
