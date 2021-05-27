const { saveAttendee,saveResearcher,savePresenter } = require('../dal/user.dao');
const{saveResearcheruploads,savePresenteruploads}=require('../dal/uploads.dao')

const createResearcherupoloads = async ({type,status,details}) => {

    const ResearcherFile = {
        type,
        status,
        details
    }

    return await saveResearcheruploads(ResearcherFile);
}
const createPresenteruploads = async({type,status,details}) =>{
    const PresenterFile = {
        type,
        status,
        details
    }

    return await savePresenteruploads(PresenterFile);
}
const createAttendee = async({username,email,phoneNumber,plan}) =>{
    const Attendee = {
        username,
        email,
        phoneNumber,
        plan
    }

    return await saveAttendee(Attendee);
}
const createResearcher = async({title, fullName, status, currentAffilation, jobTitle, address, phoneNumber, email, password}) =>{
    const Researcher = {
        title,
        fullName,
        status,
        currentAffilation,
        jobTitle,
        address,
        phoneNumber,
        email,
        password
    }

    return await saveResearcher(Researcher);
}
const createPresenter = async({title, fullName, status, currentAffilation, jobTitle, address, phoneNumber, email, password}) =>{
    const Presenter = {
        title,
        fullName,
        status,
        currentAffilation,
        jobTitle,
        address,
        phoneNumber,
        email,
        password
    }

    return await savePresenter(Presenter);
}

module.exports={createResearcherupoloads,createPresenteruploads,createAttendee,createResearcher,createPresenter};