exports = async function(changeEvent) {
  var doc = changeEvent.fullDocument;
  var conn = context.services.get("mongodb-atlas").db("aws").collection("normalizedData");
  
  var res = [];
  
  if(doc.response.hasOwnProperty('Reservations')) {
    for(var i=0; i<doc.response.Reservations.length; i++) {
      res = res.concat(doc.response.Reservations[0].Instances);
    }
    doc.lineItems = res;
  }
  else if(doc.response.hasOwnProperty('Keys')) {
    doc.lineItems = doc.response.Keys;
  }
  
  delete doc._id;
  delete doc.response;
  
  //console.log(EJSON.stringify(doc));
  console.log(doc.lineItems.length);
  
  for(var i=0; i<doc.lineItems.length; i++){
    var newDoc = JSON.parse(JSON.stringify(doc));
    newDoc.li = newDoc.lineItems[i];
    delete newDoc.lineItems;
    await conn.insertOne(newDoc);
  }
  
};
