exports = async function(changeEvent) {
  var doc = changeEvent.fullDocument;
  var conn = context.services.get("mongodb-atlas").db("aws").collection("normalizedData");
  
  if(doc.response.hasOwnProperty('Reservations')) {
    doc.lineItems = doc.response.Reservations[0].Instances;
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
