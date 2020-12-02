const {MPESA} = require('./dist')

const client = {
    input_Amount: '100',
    input_PrimaryPartyCode: '000000',
    input_ReceiverPartyCode: '000001',
    input_PurchasedItemsDesc: 'Shoes',
    input_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e',
    input_TransactionReference: 'T12344C',
    app: 'sandbox'
}

setTimeout(async() => {
    console.log(await MPESA.b2b(client))
})