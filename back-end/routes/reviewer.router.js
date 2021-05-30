const router = require('express').Router();
const {getUploadRequest, updateStatus} = require("../api/reviewer.api");
const {auth}=require('../middleware/auth')
const {transporter}=require('../utils/mail')


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
router.patch("/upload/:id",auth, async (req, res) => {

    let requests = await updateStatus(req.params.id, req.body.status);

    if(requests) {
        if(req.body.status=="approved"){
            if(req.body.type=="research"){

                let mailOptions={
                    from: 'lynxmass@gmail.com', //the mail which is registered inside the transporter object in mail.api.js file
                    to: req.body.email,
                    subject: 'Submission Approval Confirmation',
                    text: 'This mail is to ensure that your research paper has been approved.'
                }

                transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(info.response)
                    }
                })


            }else if(req.body.type=="workshop"){

                let mailOptions={
                    from: 'lynxmass@gmail.com', //the mail which is registered inside the transporter object in mail.api.js file
                    to: req.body.email,
                    subject: 'Submission Approval Confirmation',
                    text: 'This mail is to ensure that your workshop proposal has been approved.'

                }

                transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(info.response)
                    }
                })


            }

        }
        res.status(201).send(requests);
    }
    else {
        res.status(502).send("Error");
    }
});

module.exports = router;