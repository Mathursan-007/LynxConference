
let upload = null;
const ObjectID = require('mongodb').ObjectId;

setTimeout(() => {
    upload = require('./connection').db('conferenceDB').collection('upload');
},5000);
const saveResearcheruploads = async({type,status,details})=>{

    const result = await upload.insertOne({type,status,details});
    return result.ops[0];

}
const savePresenteruploads = async({type,status,details})=>{

    const result = await upload.insertOne({type,status,details});
    return result.ops[0];

}
module.exports={saveResearcheruploads,savePresenteruploads};