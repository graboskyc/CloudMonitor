#!/bin/bash
  
uri=""
atlasun=""
atlaspw=""
longConStr=""
dir="/home/ubuntu/awslistall/data/"

${dir}../bin/aws_list_all query --service ec2 --directory ${dir} --operation DescribeInstances
${dir}../bin/aws_list_all query --service eks --directory ${dir} --operation ListClusters
${dir}../bin/aws_list_all query --service docdb --directory ${dir} --operation DescribeDBClusters
${dir}../bin/aws_list_all query --service rds --directory ${dir} --operation DescribeDBClusters
${dir}../bin/aws_list_all query --service kinesis --directory ${dir} --operation ListStreams

mongo $uri -u ${atlasun} -p ${atlaspw} --authenticationDatabase "admin" --eval "db = db.getSisterDB('aws');db.resourcelistraw.deleteMany({});"

for fn in ${dir}*.json
        do
        mongoimport --host ${longConStr}  --ssl --username ${atlasun} --authenticationDatabase admin --db aws --collection resourcelistraw --type json --password ${atlaspw} --file ${fn}
done