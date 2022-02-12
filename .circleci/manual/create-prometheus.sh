#!/bin/bash
cd ../


# aws cloudformation deploy \
#   --template-file files/prometheus.yml \
#   --stack-name "prometheus" \
#   --parameter-overrides ID="1"

# sleep 30

export PROMETHEUS_IP=$(aws ec2 describe-instances \
	--filters 'Name=tag:Name,Values=prometheus-*' \
	--query "Reservations[*].Instances[0].PublicIpAddress" \
	--output text)

cd ansible 

prometheus_inventory=inventory-prometheus.txt
echo "[prometheus]" > $prometheus_inventory
echo "$PROMETHEUS_IP" >> $prometheus_inventory

cat $prometheus_inventory

ansible-playbook -i $prometheus_inventory configure-prometheus.yml