const {MPESA} = require('./dist')

const client = {
    input_QueryReference: '000000000000000000001',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: 'asv02e5958774f7ba228d83d0d689761',
    app: 'sandbox'
}

setTimeout(async() => {
    console.log(await MPESA.status(client))
})