let payment = null;


setTimeout( async () => {
    payment = await require('./connection').db('conferenceDB').collection('payment');
}, 5000);

// Saving the payment details made by a researcher for an approved research paper submission
const savePaymentDetails = async({email,researchPaperID,cardHolderName,cardNumber,cvv,expiryDate,price})=>{

    const result = await payment.insertOne({email,researchPaperID,cardHolderName,cardNumber,cvv,expiryDate,price});
    return result.ops[0];
}


module.exports = { savePaymentDetails };