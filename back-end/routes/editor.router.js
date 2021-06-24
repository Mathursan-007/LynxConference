const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const {addLog}=require('../api/admin.api')
const { createRequest , modifyRequest , getRequests , getConference } = require('../api/editor.api');
const {auth}=require('../middleware/auth')



//create a keynote speaker using the keynote speaker details that has been provided by the editor
router.post("/addKeynote",auth,upload.single('photo'),async (req,res)=>{

    try{
        const result = await cloudinary.uploader.upload(req.file.path);

        let keynoteSpeaker = await createRequest({
            type: 'keynote',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.name,
                description: req.body.description,
                photo: result.secure_url
            }
        });

        console.log(keynoteSpeaker);

        if(keynoteSpeaker) {
            await addLog("Editor","Keynote speaker page edit request sent")
            res.status(201).send(keynoteSpeaker);
        } else {
            res.status(502).json({error:"Keynote speaker wasn't added"});
        }
    } catch (err) {
        console.log(err);
    }

});

//create a workshop using the keynote speaker details that has been provided by the editor
router.post("/addWorkshop",auth,upload.single('workshopFile'),async (req,res)=>{


    try{
        //let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });
        const result = await cloudinary.uploader.upload(req.file.path);

        let workshop = await createRequest({
            type: 'workshop',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.title,
                description: req.body.description,
                photo: result.secure_url
            }
        });

        if(workshop) {
            await addLog("Editor","Workshop page edit request sent")
            res.status(201).send(workshop);
        } else {
            res.status(502).json({error:"Workshop wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});

//create a news using the news details that has been provided by the editor
router.post("/addNews",auth, async (req,res)=>{


    try{
        let newDate = new Date()
        let date = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;
        let news = await createRequest({
            type: 'news',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.title,
                description: req.body.description,
                date
            }
        });

        if(news) {
            await addLog("Editor","News page edit request sent")
            res.status(201).send(news);
        } else {
            res.status(502).json({error:"News wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});

//create a workshop using the keynote speaker details that has been provided by the editor
router.post("/addTemplate",auth,upload.single('file'),async (req,res)=>{


    try{
        let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });


        let template = await createRequest({
            type: 'template',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.title,
                file: result.secure_url
            }
        });

        if(template) {
            res.status(201).send(template);
            await addLog("Editor","Template page edit request sent")
        } else {
            res.status(502).json({error:"Workshop wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});

//create a news using the news details that has been provided by the editor
router.post("/addConference", auth,async (req,res)=>{


    try{
        let conference = await createRequest({
            type: 'conference',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.name,
                institute: req.body.institute,
                faculty: req.body.faculty,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description
            }
        });

        if(conference) {
            await addLog("Editor","Conference details page edit request sent")
            res.status(201).send(conference);
        } else {
            res.status(502).json({error:"Conference wasn't added"});
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

//retrieve all the requests created by a particular editor and pass as response
router.get("/conference",async (req,res)=>{

    let conference=await getConference();

    if(conference){
        res.status(201).send(conference);
    }else{

        res.status(502).send("Error");
    }


})

//create a workshop using the keynote speaker details that has been provided by the editor
router.put("/updateKeynote/:id",auth,upload.single('photo'),async (req,res)=>{

    let photo;

    try{

        if(req.file == undefined) {
            photo = req.body.imgUrl;
        } else {
            let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });
            photo = result.secure_url;
        }

        let keynote = await modifyRequest(req.params.id,{
            type: 'keynote',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.name,
                description: req.body.description,
                photo: photo
            }
        });

        if(keynote) {
            await addLog("Editor","Keynote page edit request sent")
            res.status(201).send(keynote);
        } else {
            res.status(502).json({error:"Workshop wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});

router.put("/updateWorkshop/:id",auth,upload.single('photo'),async (req,res)=>{

    let photo;

    try{

        if(req.file == undefined) {
            photo = req.body.imgUrl;
        } else {
            let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });
            photo = result.secure_url;
        }

        let workshop = await modifyRequest(req.params.id,{
            type: 'workshop',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.name,
                description: req.body.description,
                photo: photo
            }
        });

        if(workshop) {
            res.status(201).send(workshop);
        } else {
            res.status(502).json({error:"Workshop wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});

router.put("/updateTemplate/:id",auth,upload.single('file'),async (req,res)=>{

    let file;

    try{

        if(req.file == undefined) {
            file = req.body.fileUrl;
        } else {
            let result = await cloudinary.uploader.upload(req.file.path,{ public_id: req.file.originalname,resource_type: "raw" });
            file = result.secure_url;
        }

        let template = await modifyRequest( req.params.id, {
            type: 'template',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.title,
                file: file
            }
        });

        if(template) {
            res.status(201).send(template);
        } else {
            res.status(502).json({error:"Workshop wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});

router.put("/updateNews/:id", auth,async (req,res)=>{


    try{

        let newDate = new Date()
        let date = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;
        let news = await modifyRequest(req.params.id,{
            type: 'news',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.name,
                description: req.body.description,
                date
            }
        });

        if(news) {
            res.status(201).send(news);
        } else {
            res.status(502).json({error:"Workshop wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});

router.put("/updateConference/:id",auth, async (req,res)=>{


    try{

        let conference = await modifyRequest(req.params.id,{
            type: 'conference',
            status: 'pending',
            last_modified: new Date(),
            details: {
                name: req.body.name,
                institute: req.body.institute,
                faculty: req.body.faculty,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description
            }
        });

        if(conference) {
            res.status(201).send(conference);
        } else {
            res.status(502).json({error:"Workshop wasn't added"});
        }

    } catch (err) {
        console.log(err);
    }

});



module.exports=router;