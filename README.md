# MICRO PAYMENT


### Requirements
1. `python --version >= 3.6` on your machine or [download.](https://www.python.org/downloads/)

2. `pip install pycrypto` to install `pycrypto` or [visit.](https://pypi.org/project/pycrypto/)

3. `nodejs --v >= 10` on your machine or [download](https://nodejs.org/en/)


###### NOTE
**Don't forget to add app type on every transaction, app can be either sandbox for development environment or openapi for production (live) enviroment.**

### MPESA Customer to Business Transaction (C2B)
1. Sample request object
```
const client = {
    input_Amount: '0000',
    input_CustomerMSISDN: '000000000001',
    input_PurchasedItemsDesc: 'Donation',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e',
    input_TransactionReference: 'T12344C',
    app: 'sandbox'
}
```
2. Sending **c2b** transaction
```
setTimeout(async () => {
   console.log(await MPESA.c2b(client))
}, 1000)
```
3. Sample success response object
```
{
  "output_ResponseCode": "INS-0",
  "output_ResponseDesc": "Request processed successfully",
  "output_TransactionID": "yzsRm4j8C2SK",
  "output_ConversationID": "c0b077ab74574342abdb50a71d7b5117",
  "output_ThirdPartyConversationID": "1e9b774d1da34af78412a498cbc28f5e"
}
```

4. Failure response
`returns false` and `log` the `error message` on the `console` 
```
**Customer to business transaction return a promise, so you have to await to get the results.** 
