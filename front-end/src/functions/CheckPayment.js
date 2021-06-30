const CheckPayment = paymentStatus => {

    if(paymentStatus === "paid") {
        return true;
    } else {
        return false;
    }
}

module.exports = CheckPayment;
