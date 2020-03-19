#!/bin/bash
  
uri=""
atlasun=""
atlaspw=""

./bin/aws_list_all query --service ec2 --directory ./data/ --operation DescribeInstances
./bin/aws_list_all query --service kms --directory ./data/ --operation ListKeys

mongo $uri -u ${atlasun} -p ${atlaspw} --authenticationDatabase "admin" --eval "db = db.getSisterDB('aws');db.resourcelistraw.deleteMany({});"
mongo $uri -u ${atlasun} -p ${atlaspw} --authenticationDatabase "admin" --eval "db = db.getSisterDB('aws');db.normalizedData.deleteMany({});"

for fn in data/*.json
        do
        echo ${fn}
        line=`cat $fn`
        mongo $uri -u ${atlasun} -p ${atlaspw} --authenticationDatabase "admin" --eval "db = db.getSisterDB('aws');db.resourcelistraw.insertOne(${line});"
done