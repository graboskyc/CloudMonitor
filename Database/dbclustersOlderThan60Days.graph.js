[{$match: {
    $or:[
    {"service":"docdb"},
    {"service":"rds"}],
  }}, {$project: {service:1,"un":"$li.MasterUsername",ccts:"$li.ClusterCreateTime",cctd:{$toDate:"$li.ClusterCreateTime"},ci:"$li.DBClusterIdentifier"}}, 
    {$match:{
    cctd: {$lt: new Date((new Date())-1000*60*60*24*60)}
  }}]