let reviewer=null;

const ObjectID = require('mongodb').ObjectId;

setTimeout(() => {
    reviewer = require('./connection').db('conferenceDB').collection('reviewer');
},5000);


const saveReviewer = async({empID,email,password})=>{

    const result = await reviewer.insertOne({empID,email,password});
    return result.ops[0];

}

const deleteReviewer =async (id)=>{
    return await reviewer.findOneAndDelete({_id:ObjectID(id)})
}

module.exports={saveReviewer,deleteReviewer};






