const { findResearcher,loginResearcher,saveResearcher} = require('../dal/researcher.dao');
const { findPresenter,loginPresenter,savePresenter } = require('../dal/presenter.dao');
const {saveAttendee}=require('../dal/attendee.dao')
const{saveResearcherUploads,savePresenterUploads}=require('../dal/upload.dao')
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
        plan
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
        password:bcrypt.hashSync(password,10)
    }

    if(type=="presenter"){
        return await savePresenter(user);
    }else if(type=="researcher"){
        return await saveResearcher(user);
    }

}


const loginUser = async ({email,password})=>{

    let pwd=await loginPresenter(email);
    if(pwd){
        if(bcrypt.compareSync(password,pwd)){   //comparing the plain text of the password given at the login and the hashed password saved in the db.
            return true;
        }else{
            return false;
        }
    }else{

        pwd=await loginResearcher(email);
        if(pwd){
            if(bcrypt.compareSync(password,pwd)){   //comparing the plain text of the password given at the login and the hashed password saved in the db.
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

}


const createResearcherUploads = async ({type,status,details}) => {

    const ResearcherFile = {
        type,
        status,
        details,
        date:new Date().toDateString()
    }

    return await saveResearcherUploads(ResearcherFile);
}


const createPresenterUploads = async({type,status,details}) =>{

    const PresenterFile = {
        type,
        status,
        details,
        date:new Date().toDateString()
    }

    return await savePresenterUploads(PresenterFile);
}



module.exports={createResearcherUploads,createPresenterUploads,createAttendee,createUser,loginUser,checkUser};