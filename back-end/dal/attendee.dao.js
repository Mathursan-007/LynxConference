let attendee=null;

const ObjectID = require('mongodb').ObjectId;

setTimeout(() => {
    attendee = require('./connection').db('conferenceDB').collection('attendee');
},5000);


const saveAttendee = async({fullName,email,phoneNumber,plan})=>{

    const result = await attendee.insertOne({fullName,email,phoneNumber,plan});
    return result.ops[0];

}

const getAllAttendees = async ()=>{

    const result = await attendee.find({});
    return result.toArray();

}


module.exports={saveAttendee,getAllAttendees};






