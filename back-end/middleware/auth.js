const jwt =require('jsonwebtoken');

function auth(req,res,next){

    const authHeader=req.header('authorization');

    //check token
    if(authHeader==null){
        return res.status(401).json({error:"Access-denied"});
    }

    //check validity
    try{
        const verified=jwt.verify(authHeader,"secret");
        req.id={username:verified.username}; //if verified the token will be decoded and the email address of the user will be extracted and passed.
        next();

    }catch (e){
        console.log(req.id)
        res.status(401).json({error:"Invalid-token"});
    }

}

module.exports={auth}