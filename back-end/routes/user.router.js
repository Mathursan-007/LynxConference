const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const { createResearcherUploads,createPresenterUploads,createAttendee,createUser,loginUser,checkUser } = require('../api/user.api');
const jwt =require('jsonwebtoken');
const {auth}=require('../middleware/auth')


router.post("/login",async(req,res)=>{


    let user = req.body;

    if(user.username==="admin" && user.password==="admin"){

        const accessToken=jwt.sign({username:user.password},"secret");
        res.status(201).json({accessToken:accessToken,user:"admin"})

    }else if(user.username==="admin" && user.password==="editor"){

        const accessToken=jwt.sign({username:user.password},"secret");
        res.status(201).json({accessToken:accessToken,user:"editor"})

    }else if(user.username==="admin" && user.password==="reviewer"){

        const accessToken=jwt.sign({username:user.password},"secret");
        res.status(201).json({accessToken:accessToken,user:"reviewer"})

    } else{

        let login=await loginUser(user);
        if(login){
            const accessToken=jwt.sign({username:user.username},"secret");
            res.status(201).json({accessToken:accessToken,user:login})
        }else{
            res.status(502).json({error:"Wrong Email or Password"})
        }
    }



})




router.post("/addAttendee",auth,async (req,res)=>{


        let Attendee = await createAttendee(req.body)

        if(Attendee) {
            res.status(201).send("Attendee added");
        } else {
            res.status(400).json({error:"Attendee wasn't added"});
        }

    }
);


router.post("/addUser",auth,async (req,res)=>{


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



router.post("/addResearcherUploads",auth,upload.single('paper'),async (req,res)=>{

    try{
        let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });

        let Upload = await createResearcherUploads({
            type: 'research',
            status: 'pending',
            details: {
                name: req.body.name,
                email: req.body.email,
                phoneNumber:req.body.phoneNumber,
                paper:result.secure_url
            },
            stacks:req.body.stacks,
            user:req.id.username
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
                name: req.body.name,
                email: req.body.email,
                phoneNumber:req.body.phoneNumber,
                proposal:result.secure_url
            },
            user:req.id.username
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