const checkPath = (path) =>{
    if(path.toString().startsWith('/admin')|| path.toString().startsWith('/editor')|| path.toString().startsWith('/reviewer')||
        path.toString().startsWith('/presenter')|| path.toString().startsWith('/researcher')){
        return true
    }
    else{
        return false
    }
}
module.exports = checkPath