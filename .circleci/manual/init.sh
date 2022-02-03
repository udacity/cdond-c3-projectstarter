#!/bin/bash

source ../.env

bash create-bucket.sh

bash create-db.sh

bash create-cloudfront.sh