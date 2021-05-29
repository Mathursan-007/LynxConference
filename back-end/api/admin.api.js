const { getAllRequests, updateStatus } = require('../dal/request.dao');
//retrieving the request details of all requests from the dal


const getRequests = async ()=>{
    return await getAllRequests();
}

const requestReply = async(id,status)=>{
    return updateStatus(id,status)
}


module.exports = { getRequests , requestReply };