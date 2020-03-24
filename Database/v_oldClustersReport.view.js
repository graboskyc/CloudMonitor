[{"$match": {
    service: 'ec2'
  }}, {$project: {
    service: 1,
    region: 1,
    dns: '$li.PublicDnsName',
    lts: '$li.LaunchTime',
    ltd: {
      $toDate: '$li.LaunchTime'
    },
    owner: {
      "$filter": {
        input: '$li.Tags',
        as: 't',
        cond: {
          $eq: [
            '$$t.Key',
            'owner'
          ]
        }
      }
    }
  }},{"$match":{
      ltd: {"$lt": new Date((new Date())-1000*60*60*24*60)}
    }}, {"$unwind": {
    path: "$owner"
  }}, {"$group": {
    _id: "$owner.Value",
    computeInstances:{"$push":"$$ROOT"}
  }}]