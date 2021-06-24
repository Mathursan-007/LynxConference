let researcher=null;
const ObjectID = require('mongodb').ObjectId;

setTimeout(() => {
    researcher = require('./connection').db('conferenceDB').collection('researcher');
},5000);


const findResearcher = async(id)=>{

    const result = await researcher.findOne({id:id})
    if(result){
        return true
    }else{
        return false;
    }

}

const loginResearcher = async (email)=>{

    const result =await researcher.findOne({email:email})
    if(result){
        return result.password
    }else{
        return false;
    }
}

const saveResearcher = async({title, fullName, id,status, currentAffiliation, jobTitle, address, phoneNumber, email,password,date})=>{

    const result = await researcher.insertOne({title, fullName,id, status, currentAffiliation, jobTitle, address, phoneNumber,email,password,date});
    return result.ops[0];

}



module.exports={findResearcher,saveResearcher,loginResearcher};






