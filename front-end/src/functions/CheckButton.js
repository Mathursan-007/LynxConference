const CheckButton = (status, reviewerID) => {
    const str = reviewerID + "";
    const length = str.length;

    if( (status=="approved" || status=="rejected" || length<5) || str=="" ) {
        return true;
    } else if( status=="pending" ) {
        return false;
    } else {
        return true;
    }
}

module.exports = CheckButton;
