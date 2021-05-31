const { getAllRequests, updateStatus } = require('../dal/request.dao');
const {getAllUploads} = require("../dal/upload.dao");
const {getAllLogs,saveLog} = require("../dal/log.dao");

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


const addLog=async(user,action)=>{
    const log={
        user,
        action,
        date:new Date().toDateString(),
        time:new Date().toLocaleTimeString()
    }
    return await saveLog(log);
}

const getLogs =async ()=>{
    return await getAllLogs()
}

module.exports = { getRequests , requestReply,getUploads ,addLog,getLogs};