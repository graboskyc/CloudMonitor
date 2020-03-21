[{$unwind: {
    path: '$response.Reservations',
    preserveNullAndEmptyArrays: true
  }}, {$unwind: {
    path: '$response.Reservations.Instances',
    preserveNullAndEmptyArrays: true
  }}, {$unwind: {
    path: '$response.Keys',
    preserveNullAndEmptyArrays: true
  }}, {$unwind: {
    path: '$response.Streams',
    preserveNullAndEmptyArrays: true
  }}, {$unwind: {
    path: '$response.DBClusters',
    preserveNullAndEmptyArrays: true
  }}, {$project: {
    service: 1,
    region: 1,
    li: {
      $switch: {
        branches: [
          {
            'case': '$response.Reservations.Instances',
            then: '$response.Reservations.Instances'
          },
          {
            'case': '$response.DBClusters',
            then: '$response.DBClusters'
          },
          {
            'case': '$response.Keys',
            then: '$response.Keys'
          },
          {
            'case': '$response.StreamNames',
            then: '$response.StreamNames'
          }
        ],
        'default': 'Did not match'
      }
    }
  }}]