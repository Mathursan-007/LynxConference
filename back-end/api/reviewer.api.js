const {getAllUploads, getUploadsRequestByEmail, updateUploadStatus, updatePaymentStatus} = require("../dal/upload.dao");


// Retrieving all the research paper submissions and workshop proposal submissions
// from the DB by calling methods from the dao
const getUploadRequest = async () => {
    return await getAllUploads();
}

// Retrieving research paper submissions and workshop proposal submission uploads using email id
const getUploadsByEmail = async (email, type) => {
    return await getUploadsRequestByEmail(email, type);
}


// Updating the status of research paper and workshop proposal submissions
const updateStatus = async (id, status, reviewerID) => {
    return await updateUploadStatus(id, status, reviewerID);
}


const updatePayment = async (id, status) => {
    return await updatePaymentStatus(id, status);
}


module.exports = { getUploadRequest, getUploadsByEmail, updateStatus, updatePayment };
