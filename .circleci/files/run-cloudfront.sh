
export BUCKET_SUFFIX="dhrcrbfuzoa39ivkvf2pb"

# aws s3api create-bucket --bucket udapeople-${BUCKET_SUFFIX} --acl public-read-write --region us-west-2 --profile UdacityLab

aws cloudformation deploy \
         --template-file cloudfront.yml \
         --stack-name InitialStack\
         --parameter-overrides WorkflowID=${BUCKET_SUFFIX}

