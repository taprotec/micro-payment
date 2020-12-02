"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const connect = __importStar(require("child_process"));
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const host = 'https://openapi.m-pesa.com/sandbox';
const country = 'TZN';
const currency = 'TZS';
class mpesa {
    // private key encrption 
    encrypt(privateKey) {
        try {
            let publicKey = process.env.PUBLIC_KEY;
            if (privateKey && publicKey) {
                const connection = connect.spawnSync('python', [path_1.default.join(__dirname, '../python/index.py'), privateKey, publicKey]);
                if (connection.status === 0)
                    return connection.stdout.toString().substring(2, 686);
                else
                    return false;
            }
            else
                return false;
        }
        catch (error) {
            console.error(error.message);
            return false;
        }
    }
    // create session 
    async createSession(client) {
        try {
            if (process.env.API_KEY) {
                const key = await this.encrypt(process.env.API_KEY);
                const options = {
                    body: '',
                    path: '/ipg/v2/vodacomTZN/getSession/',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + key,
                        Origin: '*'
                    }
                };
                const session = await this.sendRequest(options);
                if (session) {
                    const encrptedSession = await this.encrypt(session);
                    if (encrptedSession) {
                        const options = {
                            body: client,
                            path: client.path,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + encrptedSession,
                                Origin: '*'
                            }
                        };
                        const transaction = await this.sendRequest(options);
                        if (transaction)
                            return transaction;
                        else
                            return false;
                    }
                    else
                        return false;
                }
                else
                    return false;
            }
            else
                return false;
        }
        catch (error) {
            console.error(error.message);
            return false;
        }
    }
    // request sending
    async sendRequest(options) {
        try {
            if (options.method === 'GET') {
                const response = await axios_1.default.get(host + options.path, { headers: options.headers });
                if (response.data.output_ResponseCode === 'INS-0')
                    return response.data.output_SessionID;
                else
                    return false;
            }
            else {
                const response = await axios_1.default.post(options.path, { body: JSON.stringify(options.body), headers: options.headers });
                console.log(response.data);
            }
        }
        catch (error) {
            console.error(error.message);
            return false;
        }
    }
    async c2b(client) {
        try {
            const response = await this.createSession(client);
            if (response)
                return response;
            else
                return false;
        }
        catch (error) {
            console.error(error.message);
            return false;
        }
    }
}
exports.default = mpesa;
const Mpesa = new mpesa();
const client = {
    input_Amount: 3000,
    input_Country: country,
    input_Currency: currency,
    input_CustomerMSISDN: '000000000001',
    input_PurchasedItemsDesc: 'Donation',
    input_ServiceProviderCode: '000000',
    input_ThirdPartyConversationID: '1e9b774d1da34af78412a498cbc28f5e',
    input_TransactionReference: 'T12344C',
    path: host + '/ipg/v2/vodacomTZN/c2bPayment/singleStage/'
};
Mpesa.c2b(client);
// setInterval(async () => {
//     console.log(await Mpesa.createSession())
// }, 10000)
