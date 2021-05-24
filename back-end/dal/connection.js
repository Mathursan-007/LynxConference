const MongoClient = require('mongodb').MongoClient;

const {URI} = require('../config')

const client = new MongoClient(URI, {
    useNewUrlParser: true, useUnifiedTopology: true
});


client.connect(err => {

    if(err){
        console.log(err)
    }

    console.log("connected");
    //client.close();
});

module.exports=client;
