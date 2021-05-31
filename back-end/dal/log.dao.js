let log=null;

const ObjectID = require('mongodb').ObjectId;

setTimeout(() => {
    log = require('./connection').db('conferenceDB').collection('log');
},5000);


const saveLog = async({user,action,date,time})=>{

    const result = await log.insertOne({user,action,date,time});
    return result.ops[0];

}


const getAllLogs =async ()=>{

    const results = await log.find({});
    return results.toArray();

}

module.exports={saveLog,getAllLogs};






