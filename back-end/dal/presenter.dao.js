let presenter=null;
const ObjectID = require('mongodb').ObjectId;

setTimeout(() => {
    presenter = require('./connection').db('conferenceDB').collection('presenter');
},5000);


const findPresenter = async(id)=>{

    const result = await presenter.findOne({id:id})
    if(result){
        return true
    }else{
        return false;
    }
}

const loginPresenter = async (email)=>{
    const result =await presenter.findOne({email:email})
    if(result){
        return result.password
    }else{
        return false;
    }
}


const savePresenter = async({title, fullName, id,status, currentAffiliation, jobTitle, address, phoneNumber, email, password,date})=>{

    const result = await presenter.insertOne({title, fullName,id, status, currentAffiliation, jobTitle, address, phoneNumber, email,password,date});
    return result.ops[0];

}


module.exports={findPresenter,savePresenter,loginPresenter};






