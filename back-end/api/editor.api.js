const { saveKeynoteSpeaker , getAllRequests , saveWorkshop } = require('../dal/request.dao');


const createKeynoteSpeaker = async ({type,status,details}) => {

    const keynoteSpeaker = {
        type,
        status,
        details
    }

    return await saveKeynoteSpeaker(keynoteSpeaker);
}

const createWorkshop = async ({type,status,details}) => {

    const workshop = {
        type,
        status,
        details
    }

    return await saveWorkshop(workshop);
}

//retrieving the request details of all requests from the dal hi
const getRequests = async ()=>{
    return await getAllRequests();
}

module.exports = { createKeynoteSpeaker , getRequests , createWorkshop };