const router = require('express').Router();
const cloudinary = require("../utils/cloudinary");
const {getUploadRequest, updateStatus} = require("../api/reviewer.api");
const jwt = require('jsonwebtoken');
const {CLOUD_NAME, API_KEY, API_SECRET} = require('../config');


// -------------------------- Research Paper -------------------------------
// Retrieving all the requests of Research Paper Submissions
router.get("/uploads", async (req, res) => {

    let requests = await getUploadRequest();
    if (requests) {
        res.status(201).send(requests);
    }
    else {
        res.status(502).send("Error");
    }
});

// Retrieving a specific Research Paper Submission
// TODO:

// ---------------------------- Workshop Proposal ---------------------------
// Retrieving all the requests of Workshop Proposals
router.get("/reply/:id", async (req, res) => {
    let requests = await updateStatus(req.params.id, req.body);

    if(requests) {
        res.status(201).send(requests);
    }
    else {
        res.status(502).send("Error");
    }
});

// Retrieving a specific Workshop Proposal Submission
// TODO:



module.exports = router;