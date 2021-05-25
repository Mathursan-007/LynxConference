const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const { createKeynoteSpeaker , getRequests , createWorkshop } = require('../api/editor.api');
const jwt =require('jsonwebtoken');
const {CLOUD_NAME,API_KEY,API_SECRET}=require('../config');



//create a keynote speaker using the keynote speaker details that has been provided by the editor
router.post("/addKeynote",upload.single('photo'),async (req,res)=>{

    try{
        const result = await cloudinary.uploader.upload(req.file.path);

        let keynoteSpeaker = await createKeynoteSpeaker({
            type: 'keynote',
            status: 'pending',
            details: {
                name: req.body.name,
                description: req.body.description,
                photo: result.secure_url
            }
        });

        console.log(keynoteSpeaker);

        if(keynoteSpeaker) {
            res.status(201).send("Keynote Speaker added");
        } else {
            res.status(502).json({error:"Keynote peaker wasn't added"});
        }
    } catch (err) {
        console.log(err);
    }

});

//create a workshop using the keynote speaker details that has been provided by the editor
router.post("/addWorkshop",upload.single('workshopFile'),async (req,res)=>{


    try{
        let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });
        console.log(result);

        let workshop = await createWorkshop({
            type: 'workshop',
            status: 'pending',
            details: {
                name: req.body.title,
                description: req.body.description,
                photo: result.secure_url
            }
        });

        if(workshop) {
            res.status(201).send("Workshop added");
        } else {
            res.status(502).json({error:"Workshop wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});

//retrieve all the requests created by a particular editor and pass as response
router.get("/requests",async (req,res)=>{

    let requests=await getRequests();
    if(requests){
        res.status(201).send(requests);
    }else{

        res.status(502).send("Error");
    }


})



module.exports=router;