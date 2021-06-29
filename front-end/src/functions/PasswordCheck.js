const PasswordCheck= (password,confirmPassword) =>{
    if(password===confirmPassword){
        return true;
    }
    else{
        return false;
    }
}
module.exports = PasswordCheck;
