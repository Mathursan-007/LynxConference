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

module.exports = { getAllUploads, updateUploadStatus };