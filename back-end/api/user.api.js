const { findResearcher,loginResearcher,saveResearcher} = require('../dal/researcher.dao');
const { findPresenter,loginPresenter,savePresenter } = require('../dal/presenter.dao');
const {saveAttendee}=require('../dal/attendee.dao')
const{saveResearcherUploads,savePresenterUploads,getUpload}=require('../dal/upload.dao')
const {savePaymentDetails} = require('../dal/payment.dao');
const bcrypt =require('bcrypt')


const checkUser = async (id,type)=>{

    if(type=="presenter"){
        return await findPresenter(id)
    }else if(type="researcher"){
        return await findResearcher(id)
    }

}



const createAttendee = async({fullName,email,phoneNumber,plan}) =>{

    const Attendee = {
        fullName,
        email,
        phoneNumber,
        plan,//add payment
        date:new Date().toDateString(),
    }

    return await saveAttendee(Attendee);
}


const createUser = async({title, fullName,nic,passportNumber, status, currentAffiliation, jobTitle, address, phoneNumber, email, password,type}) =>{

    let id=null;
    if(nic){
        id=nic
    }else if(passportNumber){
        id=passportNumber
    }

    const user = {
        title,
        fullName,
        status,
        currentAffiliation,
        jobTitle,
        address,
        phoneNumber,
        email,
        id,
        password:bcrypt.hashSync(password,10),
        date:new Date().toDateString(),
    }

    if(type=="presenter"){
        return await savePresenter(user);
    }else if(type=="researcher"){
        return await saveResearcher(user);
    }

}


const loginUser = async ({username,password})=>{

    let pwd=await loginPresenter(username);
    if(pwd){
        if(bcrypt.compareSync(password,pwd)){   //comparing the plain text of the password given at the login and the hashed password saved in the db.
            return "presenter";
        }else{
            return false;
        }
    }else{

        pwd=await loginResearcher(username);
        if(pwd){
            if(bcrypt.compareSync(password,pwd)){   //comparing the plain text of the password given at the login and the hashed password saved in the db.
                return "researcher";
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

}


const createResearcherUploads = async ({type,status,details,stacks,user}) => {

    const ResearcherFile = {
        type,
        status,
        details,
        stacks,
        date:new Date().toDateString(),
        user
    }

    return await saveResearcherUploads(ResearcherFile);
}



const createPresenterUploads = async({type,status,details,user}) =>{

    const PresenterFile = {
        type,
        status,
        details,
        date:new Date().toDateString(),
        user
    }

    return await savePresenterUploads(PresenterFile);
}

// Adding the payment details if the researcher makes the payment after the
// research paper has been approved by the reviewer
const addPayment = async ({email, researchPaperID, cardHolderName, cardNumber, cvv, expiryDate, price}) => {
    const payment = {
        email,
        researchPaperID,
        cardHolderName,
        cardNumber,
        cvv,
        expiryDate,
        price
    }
    return await savePaymentDetails(payment);
}

const findUpload = async(email,type) =>{

    return await getUpload(email,type);
}


module.exports={createResearcherUploads,createPresenterUploads,createAttendee,createUser,loginUser,checkUser,addPayment,findUpload};