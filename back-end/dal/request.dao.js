let request = null;
const ObjectID = require('mongodb').ObjectId;

setTimeout(() => {
    request = require('./connection').db('conferenceDB').collection('request');
},5000);

//Adding a new keynote speaker to the database
const saveKeynoteSpeaker = async({type,status,details})=>{

    const result = await request.insertOne({type,status,details});
    return result.ops[0];

}

//Adding a new workshop speaker to the database
const saveWorkshop = async({type,status,details})=>{

    const result = await request.insertOne({type,status,details});
    return result.ops[0];

}

//retrieving all the requests records from the db hi
const getAllRequests =async ()=>{

    const results = await request.find({});
    return results.toArray();

}

const updateStatus = async (id,status)=>{
    return await request.updateOne({"_id":ObjectID(id)},{$set:{status:status}})
}

module.exports = { saveKeynoteSpeaker , getAllRequests , saveWorkshop , updateStatus };