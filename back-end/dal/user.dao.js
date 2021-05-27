let user=null;
const ObjectID = require('mongodb').ObjectId;
setTimeout(() => {
    user = require('./connection').db('conferenceDB').collection('user');
},5000);




const saveResearcher = async({title, fullName, status, currentAffilation, jobTitle, address, phoneNumber, email, password})=>{

    const result = await user.insertOne({title, fullName, status, currentAffilation, jobTitle, address, phoneNumber, email, password});
    return result.ops[0];

}
const savePresenter = async({title, fullName, status, currentAffilation, jobTitle, address, phoneNumber, email, password})=>{

    const result = await user.insertOne({title, fullName, status, currentAffilation, jobTitle, address, phoneNumber, email, password});
    return result.ops[0];

}
const saveAttendee = async({username,email,phoneNumber,plan})=>{

    const result = await user.insertOne({username,email,phoneNumber,plan});
    return result.ops[0];

}
module.exports={saveAttendee,saveResearcher,savePresenter};






