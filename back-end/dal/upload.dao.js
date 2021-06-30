let upload = null;
const ObjectID = require('mongodb').ObjectId;

setTimeout( async () => {
    upload = await require('./connection').db('conferenceDB').collection('upload');
}, 5000);



// Retrieving all the Research Papers submitted from the DB
const getAllUploads = async () => {
    const results = await upload.find({});

    return results.toArray();
}

// Retrieving research paper uploads and workshop uploads using email id
const getUploadsRequestByEmail = async (email, type) => {
    const result = await upload.findOne({user:email, type:type});
    // const result = await upload.findOne({"details.email":email},  {type:type});
    return result;
}

// Updating the status of Research Paper and Workshop Uploads
const updateUploadStatus = async (id, status, reviewerID) => {
    return await upload.updateOne({"_id":ObjectID(id)}, {$set: {status:status, reviewerID:reviewerID}})
}


// Updating payment Status of research paper submissions once user makes the payment
const updatePaymentStatus = async (id, status) => {
    return await upload.updateOne({"_id":ObjectID(id)}, {$set: {"details":{paymentStatus:status}}})
}

// Saving the research paper uploads into DB
const saveResearcherUploads = async({type,status,details,stacks,date,user})=>{


    const result = await upload.insertOne({type,status,details,stacks,date,user});
    return result.ops[0];

}

// Saving workshop proposals uploads into DB
const savePresenterUploads = async({type,status,details,date,user})=>{


    const result = await upload.insertOne({type,status,details,date,user});
    return result.ops[0];

}

const getUpload = async (email,type)=>{
    if(type == 'presenter') {
        const result = await upload.findOne({user: email,type:'workshop'});
        return result;
    } else if(type == 'researcher') {
        const result = await upload.findOne({user: email,type:'research'});
        return result;
    }

}


module.exports = { getAllUploads, getUploadsRequestByEmail, updateUploadStatus, updatePaymentStatus,savePresenterUploads,saveResearcherUploads,getUpload};
