const http = require('http')

const options = {
    host: 'https://openapi.m-pesa.com',
    path: '/sandbox/ipg/v2/vodacomTZN/c2bPayment/singleStage/',
    port: 443,
    method: 'POST',
    body: { "input_Amount": "3000", "input_Country": "TZN", "input_Currency": "TZS", "input_CustomerMSISDN": "000000000001", "input_PurchasedItemsDesc": "Donation", "input_ServiceProviderCode": "000000", "input_ThirdPartyConversationID": "1e9b774d1da34af78412a498cbc28f5e", "input_TransactionReference": "T12344C", "path": "https://openapi.m-pesa.com/sandbox/ipg/v2/vodacomTZN/c2bPayment/singleStage/" },
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer UuX7mGdH1lVM0GFizpxRGj+EG6GTvfKO77WHFsOBbG3mGhyg7NPYMj0OOkrQb9kq+J8QCvoGbNMXkfe3Pyl61OKJT8W3/xN3y7KyAO+gPV3AAGBRJGbX9/ZyxXtK5kuty0Bs3JjM2qPGsAgYIiYP8+QtCPeQD3Gx9y9/526e9d0Hh6omoFMylqUk08u771cEBazTGNDWG6KcfKJBgjG8CQYAeVP69Z1opUvk8UZHQMWXoxadmxyLSLObUJO4aK8mmMG+OK1cLx45uNhz5VhhNb9xBtgYuRD9KujqhdX4LIcJFzirKxTwWOubOBxkfhTUPErMiwaisB1skNgX4EIefnTdgqUofNaDyAdlJ7dH8TP0EccJ4vG68Im7YzZNhRsd8S+Sr1urvW7Wd9SMPzKxO+P/CbMYGzXWsQlXVS9TkAJdl0aJmX4vEwaf7VxiBmFGYnaBkyJ/30qFpStjO9MHaIymeGraO01NhEgf5XOJXblyQasn5PxWbgtx2qiQQcPxYpAsI4xg+IHMTovYqU0Ls78sWB/IpjELpNp2OTF3TrU/9mPx97RfhgGej7Qb/YumFXxjasLMZ1B8rnvRBp8YPsSyrXMN2+ycN0Rz9tYKnrEfQGdtgSK19Xqil6n9iCbk9ocDJu6gCiIj9vI80QILb1Ec2HN1ZlfSV4jKOk7NTgM=',
        Origin: '*'
    }
}

const req = http.request(options, response => {
    console.log(response)
})

req.on(error => {
    console.log(error.message)
})