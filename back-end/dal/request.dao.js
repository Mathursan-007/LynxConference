let request = null;
const ObjectID = require('mongodb').ObjectId;

setTimeout( () => {
    request = require('./connection').db('conferenceDB').collection('request');
},5000);



    const saveRequest = async ({type, status, last_modified, details}) => {

        const result = await request.insertOne({type, status, last_modified, details});
        return result.ops[0];

    }

    const retrieveConference = async () => {

        const result = await request.findOne({type: 'conference'});
        return result;

    }

    const updateRequest = async (id, {type, status, last_modified, details}) => {
        const result = await request.replaceOne({"_id": ObjectID(id)}, {type, status, last_modified, details});
        return result.ops[0];
    }


//retrieving all the requests records from the db
    const getAllRequests = async () => {

        const results = await request.find({});
        return results.toArray();

    }

    const updateStatus = async (id, status) => {
        return await request.updateOne({"_id": ObjectID(id)}, {$set: {status: status}})
    }


 module.exports = { saveRequest , getAllRequests , updateRequest , updateStatus , retrieveConference };

