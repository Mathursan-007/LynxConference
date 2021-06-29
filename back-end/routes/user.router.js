const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const { createResearcherUploads,createPresenterUploads,createAttendee,createUser,loginUser,checkUser,addPayment,findUpload} = require('../api/user.api');
const jwt =require('jsonwebtoken');
const {auth}=require('../middleware/auth')
const {addLog}=require('../api/admin.api')


router.post("/login",async(req,res)=>{


    let user = req.body;

    if(user.username==="admin" && user.password==="admin"){

        const accessToken=jwt.sign({username:'Admin'},"secret");
        await addLog(user.username,"logged In")
        res.status(201).json({accessToken:accessToken,user:"admin"})

    }else if(user.username==="admin" && user.password==="editor"){

        const accessToken=jwt.sign({username:'Editor'},"secret");
        await addLog(user.username,"logged In")
        res.status(201).json({accessToken:accessToken,user:"editor"})

    }else if(user.username==="admin" && user.password==="reviewer"){

        const accessToken=jwt.sign({username:'Reviewer'},"secret");
        await addLog(user.username,"logged In")
        res.status(201).json({accessToken:accessToken,user:"reviewer"})

    } else{

        let login=await loginUser(user);

        if(login){
            const accessToken=jwt.sign({username:user.username+' '+login},"secret");
            await addLog(user.username,"logged In"+"("+login+")")
            res.status(201).json({accessToken:accessToken,user:login})
        }else{
            res.status(502).json({error:"Wrong Email or Password"})
        }
    }

})




router.post("/addAttendee",async (req,res)=>{


        let Attendee = await createAttendee(req.body)

        if(Attendee) {
            await addLog("Attendee","Registered"+`${req.body.fullName}`)
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
                await addLog(req.body.type+`(${req.body.id})`,"Registered")
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
            user:req.id.username.split(' ')[0]
        });



        if(Upload) {
            await addLog(req.id.username,"Uploaded research paper")
            res.status(201).send(Upload);
        } else {
            res.status(502).json({error:"Research paper wasn't added"});
        }
    } catch (err) {
        console.log(err);
    }

});


router.post("/addPresenterUploads",auth,upload.single('proposal'),async (req,res)=>{

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
            user:req.id.username.split(' ')[0]
        });


        if(Presenter) {
            await addLog(req.id.username,"Uploaded workshop proposal")
            res.status(201).send("Proposal added");
        } else {
            res.status(502).json({error:"Proposal wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});


// Saving the payment details made by researcher whose research paper has been approved
router.post("/addPayment", auth, async (req, res) => {

    try{

        let payment = await addPayment( {
            email: req.body.email,
            researchPaperID: req.body.researchPaperID,
            cardHolderName: req.body.cardHolderName,
            cardNumber: req.body.cardNumber,
            cvv: req.body.cvv,
            expiryDate: req.body.expiryDate,
            price: req.body.price
        });

        if(payment) {
            res.status(201).send(payment);
        } else {
            res.status(502).json({error:"Payment details could not be added"});
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/researcherUpload/:email",async (req,res)=>{

    let upload=await findUpload(req.params.email,'researcher');

    if(upload){
        res.status(201).send({upload:upload,count:true});
    }else{

        res.send({count:false});
    }


})


router.get("/presenterUpload/:email",async (req,res)=>{



    let upload=await findUpload(req.params.email,'presenter');

    if(upload){
        res.status(201).send(upload);
    }else{

        res.status(502).send("Error");
    }


})



module.exports=router;