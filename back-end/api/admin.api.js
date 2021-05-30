const { getAllRequests, updateStatus } = require('../dal/request.dao');
const {getAllUploads} = require("../dal/upload.dao");
//retrieving the request details of all requests from the dal


const getRequests = async ()=>{
    return await getAllRequests();
}

const requestReply = async(id,status)=>{
    return updateStatus(id,status)
}

const getUploads = async () => {
    return await getAllUploads();
}


module.exports = { getRequests , requestReply,getUploads };