const {MPESA} = require('./dist')

const client = {
    input_Amount: '100',
    input_CustomerMSISDN: '000000000001',
    input_PurchasedItemsDesc: 'Donation',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e',
    input_TransactionReference: 'T12344C',
    app: 'sandbox'
}

setTimeout(async() => {
    console.log(await MPESA.createSession('adasdasdsa'))
})