const {getAllUploads, updateUploadStatus} = require("../dal/reviewer.dao");


// --------------------- Research Paper -----------------------
// Retrieving request details of all the Research Papers Submitted from dal
const getUploadRequest = async () => {
    return await getAllUploads();
}

// --------------------- Workshop Proposals ---------------------
// Retrieving all the request details of all the Workshop Proposlas submitted from dal
const updateStatus = async (id, status) => {
    return await updateUploadStatus();
}

module.exports = { getUploadRequest, updateStatus}