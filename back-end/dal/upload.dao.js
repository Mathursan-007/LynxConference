let upload = null;
const ObjectID = require('mongodb').ObjectId;

setTimeout( async () => {
    upload = await require('./connection').db('conferenceDB').collection('upload');
}, 5000);


//----------------------- Research Papers -------------------------------------------

// Retrieving all the Research Papers submitted from the DB
const getAllUploads = async () => {
    const results = await upload.find({});

    return results.toArray();
}

// Updating the status of Research Paper
const updateUploadStatus = async (id, status) => {
    return await upload.updateOne({"_id":ObjectID(id)}, {$set: {status:status}})
}

const saveResearcherUploads = async({type,status,details,stacks,date,user})=>{


    const result = await upload.insertOne({type,status,details,stacks,date,user});
    return result.ops[0];

}
const savePresenterUploads = async({type,status,details,date,user})=>{


    const result = await upload.insertOne({type,status,details,date,user});
    return result.ops[0];

}

module.exports = { getAllUploads, updateUploadStatus ,savePresenterUploads,saveResearcherUploads};