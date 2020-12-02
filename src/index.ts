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



const transact: transact = {
    c2b: `${market}/c2bPayment/singleStage/`,
    b2c: `${market}/b2cPayment/`,
    b2b: `${market}/b2bPayment/`,
    reversal: `${market}/reversal/`,
    status: `${market}/queryTransactionStatus/`,
    session: `${market}/getSession/`
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
    app: string,
    type: string
}

interface b2c {
    input_Amount: string,
    input_CustomerMSISDN: string,
    input_Country: string,
    input_Currency: string,
    input_ServiceProviderCode: string,
    input_TransactionReference: string,
    input_ThirdPartyConversationID: string,
    input_PaymentItemsDesc: string,
    path: string,
    app: string,
    type: string
}

interface b2b {
    input_Amount: string,
    input_Country: string,
    input_Currency: string,
    input_PrimaryPartyCode: string,
    input_ReceiverPartyCode: string,
    input_TransactionReference: string,
    input_ThirdPartyConversationID: string,
    input_PurchasedItemsDesc: string,
    path: string,
    app: string,
    type: string 
}

interface reversal {
    input_Country: string,
    input_ReversalAmount: string,
    input_ServiceProviderCode: string,
    input_ThirdPartyConversationID: string,
    input_TransactionID: string,
    path: string,
    app: string,
    type: string 
}

class mpesa {

    // private key encrption 
    private encrypt(privateKey: any) {
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
    private async createSession(client: any) {
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
                            method: client.type === 'reversal' ? 'PUT' : client.type === 'c2b' || client.type === 'b2c' || client.type === 'b2b' ? 'POST' : 'GET',
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
    private async sendRequest(options: client) {
        try {

            if (options.method === 'GET') {
                const response: any = await axios.get(options.path, { headers: options.headers })
                if (response.data.output_ResponseCode === 'INS-0')
                    return response.data.output_SessionID
                else
                    return false
            }
            else if (options.method === 'POST') {
                const response: any = await axios.post(options.path, JSON.stringify(options.body), { headers: options.headers })

                if (response.data.output_ResponseCode === 'INS-0')
                    return response.data
                else
                    return false
            }
            else if (options.method === 'PUT') {
                const response: any = await axios.put(options.path, JSON.stringify(options.body), { headers: options.headers })

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

    public async c2b(client: c2b) {
        try {
            client.type = 'c2b'
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

    public async b2c(client: b2c) {
        try {

            client.type = 'b2c'
            client.input_Country = country
            client.input_Currency = currency
            client.path = `${host}/${client.app}/${transact.b2c}`

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

    public async b2b(client: b2b) {
        try {

            client.type = 'b2b'
            client.input_Country = country
            client.input_Currency = currency
            client.path = `${host}/${client.app}/${transact.b2b}`

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

    public async reverse(client: reversal) {
        try {

            client.type = 'reversal'
            client.input_Country = country
            client.path = `${host}/${client.app}/${transact.reversal}`

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

