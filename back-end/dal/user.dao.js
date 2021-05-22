let user=null;

setTimeout(() => {
    user = require('./connection').db('conferenceDB').collection('user');
},5000);


const saveResearcher = async({fullName,mobileNo,email,doc,type})=>{

    const result = await user.insertOne({studentID,fullName,faculty,mobileNo,email,doc,type});
    return result.ops[0];

}

const savePresenter = async ({fullName,mobileNo,email,topic,resourcePeople})=>{



}

const saveAttendee = async({})=>{

}






