# MICRO PAYMENT

Python version >= 3.6

run pip install pycrypto

NodeJS version >= 10

**NOTE: App can be either sandbox for development environment or openapi for production (live) enviroment.**

###### MPESA Customer to Business Transaction (C2B)
```
const client: c2b = {
    input_Amount: '0000',
    input_CustomerMSISDN: '000000000001',
    input_PurchasedItemsDesc: 'Donation',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e',
    input_TransactionReference: 'T12344C',
    app: 'sandbox'
}

setTimeout(async () => {
   console.log(await MPESA.c2b(client))
}, 1000)

```
**Customer to business transaction return a promise, so you have to await to get the results.** 
