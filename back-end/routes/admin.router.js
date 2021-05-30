const router = require('express').Router();
const {requestReply,getRequests,getUploads}=require('../api/admin.api')
const {auth}=require('../middleware/auth')

//retrieve all the requests created by a particular editor and pass as response
router.get("/requests",async (req,res)=> {

    let requests = await getRequests();
    if (requests) {
        res.status(201).send(requests);
    } else {
        res.status(502).send("Error");
    }

})


router.patch("/reply/:id",auth,async(req,res)=>{

    let reply = await requestReply(req.params.id, req.body);

    if (reply) {
        res.status(201).send(reply);
    } else {
        res.status(502).send("Error");
    }


})


router.get("/uploads", async (req, res) => {

    let uploads = await getUploads();
    if (uploads) {
        res.status(201).send(uploads);
    }
    else {
        res.status(502).send("Error");
    }
});



module.exports=router;