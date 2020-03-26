[{$match: {
  service: 'ec2'
}}, {$project: {
  service: 1,
  region: 1,
  instanceType: '$li.InstanceType',
  owner: {
    $filter: {
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
}}, {$unwind: {
  path: '$owner',
  preserveNullAndEmptyArrays: true
}}, {$lookup: {
  from: 'instanceTypes',
  localField: 'instanceType',
  foreignField: 'name',
  as: 'instanceDetails'
}}, {$unwind: {
  path: '$instanceDetails'
}}, {$addFields: {
  hourlyDollars: {
    $toDouble: '$instanceDetails.hourlycost'
  }
}}, {$addFields: {
  dailyDollars: {
    $multiply: [
      '$hourlyDollars',
      24
    ]
  },
  monthlyDollars: {
    $multiply: [
      '$hourlyDollars',
      24,
      31
    ]
  },
  yearlyDollars: {
    $multiply: [
      '$hourlyDollars',
      24,
      365
    ]
  }
}}]