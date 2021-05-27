const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const { createResearcherupoloads,createPresenteruploads,createAttendee,createResearcher,createPresenter } = require('../api/user.api');
const jwt =require('jsonwebtoken');
const {CLOUD_NAME,API_KEY,API_SECRET}=require('../config');

router.post("/addResearcheruploads",upload.single('paper'),async (req,res)=>{

    try{
        let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });

        let Researcher = await createResearcherupoloads({
            type: 'research',
            status: 'pending',
            details: {
                name: req.body.username,
                email: req.body.email,
                phoneNumber:req.body.phoneNumber,
                paper:result.secure_url
            }
        });



        if(Researcher) {
            res.status(201).send("Researcher added");
        } else {
            res.status(502).json({error:"Researcher wasn't added"});
        }
    } catch (err) {
        console.log(err);
    }

});
router.post("/addPresenteruploads",upload.single('proposal'),async (req,res)=>{

    try{
        let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });

        let Presenter = await createPresenteruploads({
            type: 'workshop',
            status: 'pending',
            details: {
                name: req.body.username,
                email: req.body.email,
                phoneNumber:req.body.phoneNumber,
                proposal:result.secure_url
            }
        });



            if(Presenter) {
            res.status(201).send("Presenter added");
        } else {
            res.status(502).json({error:"Presenter wasn't added"});
        }
    } catch (err) {
        console.log(err);
    }

});

router.post("/addAttendee",async (req,res)=>{
    console.log("hello")
    let Attendee = await createAttendee({
        username:req.body.username,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        plan:req.body.plan

    });



    if(Attendee) {
        res.status(201).send("Attendee added");
    } else {
        res.status(502).json({error:"Attendee wasn't added"});
    }

}
);
router.post("/addResearcher",async (req,res)=>{

        let Researcher = await createResearcher({
            title:req.body.title,
            fullName: req.body.fullName,
            status: req.body.status,
            currentAffilation:req.body.currentAffilation,
            jobTitle: req.body.jobTitle,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password

        });



        if(Researcher ) {
            res.status(201).send("Researcher added");
        } else {
            res.status(502).json({error:"Researcher wasn't added"});
        }

    }
);
router.post("/addPresenter",async (req,res)=>{

        let Presenter = await createPresenter({
            title:req.body.title,
            fullName: req.body.fullName,
            status: req.body.status,
            currentAffilation:req.body.currentAffilation,
            jobTitle: req.body.jobTitle,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password

        });



        if(Presenter) {
            res.status(201).send("Presenter added");
        } else {
            res.status(502).json({error:"Presenter wasn't added"});
        }

    }
);
module.exports=router;