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
exports.MPESA = void 0;
const path_1 = __importDefault(require("path"));
const connect = __importStar(require("child_process"));
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const host = 'https://openapi.m-pesa.com';
const country = 'TZN';
const currency = 'TZS';
const market = 'ipg/v2/vodacomTZN';
const transact = {
    c2b: market + '/c2bPayment/singleStage/',
    b2c: market + '/b2cPayment/',
    b2b: market + '/b2bPayment/',
    reversal: market + '/reversal/',
    status: market + '/queryTransactionStatus/',
    session: market + '/getSession/'
};
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
                    path: `${host}/${client.app}/${transact.session}`,
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
                                Authorization: `Bearer ${encrptedSession}`,
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
                const response = await axios_1.default.get(options.path, { headers: options.headers });
                if (response.data.output_ResponseCode === 'INS-0')
                    return response.data.output_SessionID;
                else
                    return false;
            }
            else {
                const response = await axios_1.default.post(options.path, JSON.stringify(options.body), { headers: options.headers });
                if (response.data.output_ResponseCode === 'INS-0')
                    return response.data;
                else
                    return false;
            }
        }
        catch (error) {
            console.error(error.message);
            return false;
        }
    }
    async c2b(client) {
        try {
            client.input_Country = country;
            client.input_Currency = currency;
            client.path = `${host}/${client.app}/${transact.c2b}`;
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
const MPESA = new mpesa();
exports.MPESA = MPESA;
