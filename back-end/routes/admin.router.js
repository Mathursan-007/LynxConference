const router = require('express').Router();
const jwt =require('jsonwebtoken');
const {requestReply,getRequests}=require('../api/admin.api')


//retrieve all the requests created by a particular editor and pass as response
router.get("/requests",async (req,res)=> {

    let requests = await getRequests();
    if (requests) {
        res.status(201).send(requests);
    } else {
        res.status(502).send("Error");
    }

})


router.patch("/reply/:id",async(req,res)=>{

    let reply = await requestReply(req.params.id, req.body.status);

    if (reply) {
        res.status(201).send(reply);
    } else {
        res.status(502).send("Error");
    }


})



module.exports=router;