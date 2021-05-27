const router = require('express').Router();
const cloudinary = require("../utils/cloudinary");
const {getUploadRequest, updateStatus} = require("../api/reviewer.api");
const jwt = require('jsonwebtoken');
const {CLOUD_NAME, API_KEY, API_SECRET} = require('../config');


// Retrieving all the requests of Submitted Documents
router.get("/uploads", async (req, res) => {

    let requests = await getUploadRequest();
    if (requests) {
        res.status(201).send(requests);
    }
    else {
        res.status(502).send("Error");
    }
});


// Updating Status of Submitted Documents
router.patch("/upload/:id", async (req, res) => {
    console.log(req.body);
    let requests = await updateStatus(req.params.id, req.body.status);


    if(requests) {
        res.status(201).send(requests);
        console.log('Success : ' + req.body.status);
    }
    else {
        res.status(502).send("Error");
    }
});

module.exports = router;