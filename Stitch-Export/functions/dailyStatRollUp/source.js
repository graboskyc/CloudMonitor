exports = async function(){
  const pipeline = [{"$group": {
    "_id": "$service",
    "ct": {
      "$sum": 1
    }
  }}, {"$addFields": {"when": new Date()}},
  {
      "$group": {
          "_id": "$when",
          "lineItems": {
              "$addToSet": {
                  "item": "$_id",
                  "ct": "$ct"
              }
          }
      }
  }];
  
  var logcol = context.services.get("mongodb-atlas").db("aws").collection("dailyStats");
  var srccol = context.services.get("mongodb-atlas").db("aws").collection("v_normalizedData");
  var log = await srccol.aggregate(pipeline).toArray();
  await logcol.insertOne(log[0]);

};