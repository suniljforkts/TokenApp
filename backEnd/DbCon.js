// mongoClient.js
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";

const dbName = "webusers";

let usersCollection;

try{
    const client = new MongoClient(uri);
    
    client.connect();
    console.log("Connected..")
    const db = client.db(dbName);
    usersCollection = db.collection('users');

}
catch(err){
    console.log(err)
}
// Connect to the database immediately when this module is imported

// Export the collection for use in other files
module.exports = usersCollection ;
