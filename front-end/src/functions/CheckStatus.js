const checkStatus = (status) =>{
    if(status=="approved"||status=="rejected"){
        return true;
    }else if(status=="pending") {
        return false;
    }
}
module.exports = checkStatus;