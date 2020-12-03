# MICRO PAYMENT


### Requirements
1. `python --version >= 3.6` on your machine or [download.](https://www.python.org/downloads/)

2. `pip install pycrypto` to install `pycrypto` or [visit.](https://pypi.org/project/pycrypto/)

3. `node -v >= 10` on your machine or [download](https://nodejs.org/en/)


##### NOTE
###### For MPESA API's don't forget to add app type on every transaction request object, app can be either sandbox for development environment or openapi for production (live) enviroment.

###### All transactions runs asynchronus and returns promise so you've to await to get results.

### Installation
`npm install micro-payment` [MICRO PAYMENT]()

### Usage
`const { MPESA } = require('micro-payment')`
1. `MPESA.c2b()`
2. `MPESA.b2c()`
3. `MPESA.b2b()`
4. `MPESA.status()`
5. `MPESA.reverse()`

### Customer to Business Transaction (C2B)
1. **Sample c2b request object**
```
const client = {
    input_Amount: '1000',
    input_CustomerMSISDN: '000000000001',
    input_PurchasedItemsDesc: 'Donation',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e',
    input_TransactionReference: 'T12344C',
    app: 'sandbox'
}
```
2. **Sample c2b request**
```
setTimeout(async () => {
   console.log(await MPESA.c2b(client))
}, 1000)
```
3. **Sample c2b success response object**
```
{
  output_ResponseCode: 'INS-0',
  output_ResponseDesc: 'Request processed successfully',
  output_TransactionID: '2ACKKiGq2r0g',
  output_ConversationID: 'bc31410c6f4b49c1ba5e1f569415a8cb',
  output_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e'      
}
```

4. **Sample c2b failure response**
`returns false` and `log` the `error message` on the `console`

### Business to Customer Transaction (B2C)
1. **Sample b2c request object**
```
const client = {
    input_Amount: '1000',
    input_CustomerMSISDN: '000000000001',
    input_PaymentItemsDesc: 'Salary payment',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e',
    input_TransactionReference: 'T12344C',
    app: 'sandbox'
}
```
2. **Sample b2c request**
```
setTimeout(async () => {
   console.log(await MPESA.b2c(client))
}, 1000)
```
3. **Sample b2c success response object**
```
{
    output_ResponseCode: 'INS-0',
    output_ResponseDesc: 'Request processed successfully',
    output_TransactionID: '3Clqxpxmy94Y',
    output_ConversationID: '55b5c84a08774320a80c3943518ab442',
    output_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e'      
  }
```

4. **Sample b2c failure response**
`returns false` and `log` the `error message` on the `console`

### Business to Business Transaction (B2B)
1. **Sample b2b request object**
```
const client = {
    input_Amount: '100',
    input_PrimaryPartyCode: '000000',
    input_ReceiverPartyCode: '000001',
    input_PurchasedItemsDesc: 'Shoes',
    input_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e',
    input_TransactionReference: 'T12344C',
    app: 'sandbox'
}
```
2. **Sample b2b request**
```
setTimeout(async () => {
   console.log(await MPESA.b2b(client))
}, 1000)
```
3. **Sample b2b success response object**
```
{
  output_ResponseCode: 'INS-0',
  output_ResponseDesc: 'Request processed successfully',
  output_TransactionID: '1RDHPRu6Su1H',
  output_ConversationID: '09f5de8d76b541288b5291f84e993bc8',
  output_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e'      
}
```

4. **Sample b2b failure response**
`returns false` and `log` the `error message` on the `console`

### Transaction Status
1. **Sample status request object**
```
const client = {
    input_QueryReference: '000000000000000000001',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: 'asv02e5958774f7ba228d83d0d689761',
    app: 'sandbox'
}
```
2. **Sample status request**
```
setTimeout(async () => {
   console.log(await MPESA.status(client))
}, 1000)
```
3. **Sample status success response object**
```
{
  output_ResponseCode: 'INS-0',
  output_ResponseDesc: 'Request processed successfully',
  output_ResponseTransactionStatus: 'Completed',  
  output_ConversationID: '4cb66a7c16b44e01831d942f13f398bc',
  output_ThirdPartyConversationID: 'asv02e5958774f7ba228d83d0d689761'      
}
```

4. **Sample status failure response**
`returns false` and `log` the `error message` on the `console`

### Reverse Successfull Transaction
1. **Sample reverse request object**
```
const client = {
    input_ReversalAmount: '25',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: 'asv02e5958774f7ba228d83d0d689762',
    input_TransactionID: '0000000000001',
    app: 'sandbox'
}
```
2. **Sample reverse request**
```
setTimeout(async () => {
   console.log(await MPESA.reverse(client))
}, 1000)
```
3. **Sample reverse success response object**
```
{
  output_ResponseCode: 'INS-0',
  output_ResponseDesc: 'Request processed successfully',
  output_TransactionID: 'OATXGi21bMhg',
  output_ConversationID: '66cbb65bd72a493baed79235f77af4b9',
  output_ThirdPartyConversationID: 'asv02e5958774f7ba228d83d0d689762'      
}
```

4. **Sample reverse failure response**
`returns false` and `log` the `error message` on the `console`
 
### MPESA API Features
- [x] Customer to Business (C2B)
- [x] Business to Customer (B2C)
- [x] Business to Business (B2B)
- [x] Transaction Status
- [x] Reversal
- [ ] Direct Debit Create
- [ ] Direct Debit Payment


