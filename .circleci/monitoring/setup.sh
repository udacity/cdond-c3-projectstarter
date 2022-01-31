#!/bin/bash


# create ec2 ubuntu machine

# ssh into the machine and follow
# https://codewizardly.com/prometheus-on-aws-ec2-part1/



sudo useradd --no-create-home prometheus
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus