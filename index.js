const {MPESA} = require('./dist')

const client = {
    input_ReversalAmount: '25',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: 'asv02e5958774f7ba228d83d0d689762',
    input_TransactionID: '0000000000001',
    app: 'sandbox'
}

setTimeout(async() => {
    console.log(await MPESA.reverse(client))
})