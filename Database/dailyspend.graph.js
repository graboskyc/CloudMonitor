[{$project: {
    ResultsByTime:1
  }}, {$unwind: {
    path: "$ResultsByTime"
  }}, {$addFields: {
    dt: {$toDate: "$ResultsByTime.TimePeriod.Start"},
    amt: {$toDecimal: "$ResultsByTime.Total.AmortizedCost.Amount"}
  }}, {$sort: {
    dt: -1
  }}, {$limit: 30}, {$match: {
    amt:{$gt:0}
  }}]