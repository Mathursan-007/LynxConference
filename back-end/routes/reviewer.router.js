const router = require('express').Router();
const {getUploadRequest, getUploadsByEmail, updateStatus, updatePayment} = require("../api/reviewer.api");
const {auth}=require('../middleware/auth');
const {transporter}=require('../utils/mail');
const {addLog}=require('../api/admin.api')


// Retrieving all the research paper submissions and workshop proposal submissions
router.get("/uploads", async (req, res) => {

    let requests = await getUploadRequest();
    if (requests) {
        res.status(201).send(requests);
    }
    else {
        res.status(502).send("Error");
    }
});

// Retrieving the uploads of submissions using email ID separately for research uploads and workshop
// uploads using the parameter type
router.get("/uploads/notify/:email/:type", async (req, res) => {

    let requests = await getUploadsByEmail(req.params.email, req.params.type);
    if (requests) {
        res.status(201).send(requests);
    }
    else {
        res.status(502).send("Error");
    }
});


// Updating Status of research and workshop submissions by passing the ID
// For the update of status, an email notification is also sent for approved status only for
// both research and workshop submissions
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

                await transporter.sendMail(mailOptions,async (err,info)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(info.response)
                        await addLog("Reviewer","Research paper accepted and notified to "+req.body.email)
                    }
                })

                await addLog("Reviewer","Research paper accepted and notified to "+req.body.email)

            }else if(req.body.type=="workshop"){

                let mailOptions={
                    from: 'lynxmass@gmail.com', //the mail which is registered inside the transporter object in mail.api.js file
                    to: req.body.email,
                    subject: 'Submission Approval Confirmation',
                    text: 'This mail is to ensure that your workshop proposal has been approved.'

                }

                await transporter.sendMail(mailOptions,async (err,info)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(info.response)
                        await addLog("Reviewer","Workshop proposal accepted and notified to "+req.body.email)
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


router.patch("/upload/payment/:id",auth, async (req, res) => {

    let requests = await updatePayment(req.params.id, req.body.status);

    if(requests) {
        await addLog("Reviewer","Workshop proposal accepted and notified to "+req.body.email)
        res.status(201).send(requests);
    }
    else {
        res.status(502).send("Error");
    }
});

module.exports = router;
