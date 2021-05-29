const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const { createResearcherUploads,createPresenterUploads,createAttendee,createUser,loginUser,checkUser } = require('../api/user.api');
const jwt =require('jsonwebtoken');
const {auth}=require('../middleware/auth')


router.post("/login",async(req,res)=>{


    let user = req.body;
    let login=await loginUser(user);
    if(login==true){
        const accessToken=jwt.sign({email:user.email},"secret");
        res.status(201).send(accessToken);
    }else{
        res.status(502).json({error:"Wrong Email or Password"})
    }

})




router.post("/addAttendee",async (req,res)=>{


        let Attendee = await createAttendee(req.body)

        if(Attendee) {
            res.status(201).send("Attendee added");
        } else {
            res.status(400).json({error:"Attendee wasn't added"});
        }

    }
);


router.post("/addUser",async (req,res)=>{


        let check = await checkUser(req.body.id,req.body.type);

        if(check) {
            res.status(400).json({error:"Already registered"});
        } else {
            let user = await createUser(req.body)
            if(user){
                const accessToken =jwt.sign({email:req.body.email},"secret")
                res.status(201).send(accessToken);
            }else{
                res.status(400).json({error:"error"});
            }

        }

    }
);


// router.post("/addPresenter",async (req,res)=>{
//
//         let Presenter = await createPresenter(req.body);
//
//         if(Presenter) {
//             res.status(201).send("Presenter added");
//         } else {
//             res.status(502).json({error:"Presenter wasn't added"});
//         }
//
//     }
// );


router.post("/addResearcherUploads",upload.single('paper'),async (req,res)=>{

    try{
        let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });

        let Upload = await createResearcherUploads({
            type: 'research',
            status: 'pending',
            details: {
                name: req.body.username,
                email: req.body.email,
                phoneNumber:req.body.phoneNumber,
                paper:result.secure_url
            }
        });



        if(Upload) {
            res.status(201).send(Upload);
        } else {
            res.status(502).json({error:"Researcher wasn't added"});
        }
    } catch (err) {
        console.log(err);
    }

});


router.post("/addPresenterUploads",upload.single('proposal'),async (req,res)=>{

    try{
        let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });

        let Presenter = await createPresenterUploads({
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

module.exports=router;