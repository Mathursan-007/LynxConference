const { saveRequest , getAllRequests , updateRequest , retrieveConference } = require('../dal/request.dao');

const createRequest = async ({type,status,last_modified,details}) => {

    const request = {
        type,
        status,
        last_modified,
        details
    }

    return await saveRequest(request);
}

const modifyRequest = async (id,{type,status,last_modified,details}) => {

    const request = {
        type,
        status,
        last_modified,
        details
    }

    return await updateRequest(id,request);
}

const getConference = async ()=>{
    return await retrieveConference();
}

//retrieving the request details of all requests from the dal
const getRequests = async ()=>{
    return await getAllRequests();
}

module.exports = { createRequest , getRequests , modifyRequest , getConference  };