import path from 'path'
import * as connect from 'child_process'
import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const host: string = 'https://openapi.m-pesa.com'
const country: string = 'TZN'
const currency: string = 'TZS'
const market: string = 'ipg/v2/vodacomTZN'

interface client {
    path: string,
    method: string,
    headers: headers,
    body: any
}

interface headers {
    'Content-Type': string,
    Authorization: string,
    Origin: string
}

interface transact {
    c2b: string,
    b2c: string,
    b2b: string,
    reversal: string,
    status: string,
    session: string
}

interface c2b {
    input_Amount: string,
    input_CustomerMSISDN: string,
    input_Country: string,
    input_Currency: string,
    input_ServiceProviderCode: string,
    input_TransactionReference: string,
    input_ThirdPartyConversationID: string,
    input_PurchasedItemsDesc: string,
    path: string,
    app: string
}

const transact: transact = {
    c2b: market + '/c2bPayment/singleStage/',
    b2c: market + '/b2cPayment/',
    b2b: market + '/b2bPayment/',
    reversal: market + '/reversal/',
    status: market + '/queryTransactionStatus/',
    session: market + '/getSession/'
}

class mpesa {

    // private key encrption 
    protected encrypt(privateKey: any) {
        try {

            let publicKey: any = process.env.PUBLIC_KEY
            if (privateKey && publicKey) {
                const connection: any = connect.spawnSync('python', [path.join(__dirname, '../python/index.py'), privateKey, publicKey])
                if (connection.status === 0)
                    return connection.stdout.toString().substring(2, 686)
                else
                    return false
            }
            else
                return false

        } catch (error) {
            console.error(error.message)
            return false
        }
    }

    // create session 
    protected async createSession(client: any) {
        try {
            if (process.env.API_KEY) {
                const key: string = await this.encrypt(process.env.API_KEY)
                const options: client = {
                    body: '',
                    path: `${host}/${client.app}/${transact.session}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + key,
                        Origin: '*'
                    }
                }

                const session: string = await this.sendRequest(options)

                if (session) {
                    const encrptedSession: string = await this.encrypt(session)

                    if (encrptedSession) {
                        const options: client = {
                            body: client,
                            path: client.path,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${encrptedSession}`,
                                Origin: '*'
                            }
                        }
                        const transaction: any = await this.sendRequest(options)

                        if (transaction)
                            return transaction
                        else
                            return false
                    }
                    else return false
                }
                else
                    return false
            }
            else
                return false

        } catch (error) {
            console.error(error.message)
            return false
        }
    }

    // request sending
    protected async sendRequest(options: client) {
        try {

            if (options.method === 'GET') {
                const response: any = await axios.get(options.path, { headers: options.headers })
                if (response.data.output_ResponseCode === 'INS-0')
                    return response.data.output_SessionID
                else
                    return false
            }
            else {
                const response: any = await axios.post(options.path, JSON.stringify(options.body), { headers: options.headers })

                if (response.data.output_ResponseCode === 'INS-0')
                    return response.data
                else
                    return false
            }

        } catch (error) {
            console.error(error.message)
            return false
        }
    }

    async c2b(client: c2b) {
        try {
            
            client.input_Country = country
            client.input_Currency = currency
            client.path = `${host}/${client.app}/${transact.c2b}`

            const response: any = await this.createSession(client)

            if (response)
                return response
            else
                return false

        } catch (error) {
            console.error(error.message)
            return false
        }
    }

}

const MPESA = new mpesa()
export { MPESA }

