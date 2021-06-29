const priceOfType=(type)=>{
    if(type=="Basic"){
        return 5000
    }
    else if(type=="Standard"){
        return 10000
    }
    else if(type=="Premium"){
        return 20000
    }
}
module.exports = priceOfType;
