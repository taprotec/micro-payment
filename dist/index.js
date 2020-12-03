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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MPESA = void 0;
var path_1 = __importDefault(require("path"));
var connect = __importStar(require("child_process"));
var axios_1 = __importDefault(require("axios"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var host = 'https://openapi.m-pesa.com';
var country = 'TZN';
var currency = 'TZS';
var market = 'ipg/v2/vodacomTZN';
var transact = {
    c2b: market + "/c2bPayment/singleStage/",
    b2c: market + "/b2cPayment/",
    b2b: market + "/b2bPayment/",
    reversal: market + "/reversal/",
    status: market + "/queryTransactionStatus/",
    session: market + "/getSession/"
};
var mpesa = /** @class */ (function () {
    function mpesa() {
    }
    mpesa.prototype.encrypt = function (privateKey) {
        try {
            var publicKey = process.env.PUBLIC_KEY;
            if (privateKey && publicKey) {
                var connection = connect.spawnSync('python', [path_1.default.join(__dirname, '../python/index.py'), privateKey, publicKey]);
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
    };
    mpesa.prototype.createSession = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var key, options, session, encrptedSession, options_1, transaction, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        if (!process.env.API_KEY) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.encrypt(process.env.API_KEY)];
                    case 1:
                        key = _a.sent();
                        options = {
                            body: '',
                            path: host + "/" + client.app + "/" + transact.session,
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + key,
                                Origin: '*'
                            }
                        };
                        return [4 /*yield*/, this.sendRequest(options)];
                    case 2:
                        session = _a.sent();
                        if (!session) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.encrypt(session)];
                    case 3:
                        encrptedSession = _a.sent();
                        if (!encrptedSession) return [3 /*break*/, 5];
                        options_1 = {
                            body: client,
                            path: client.path,
                            method: client.type === 'reversal' ? 'PUT' : client.type === 'c2b' || client.type === 'b2c' || client.type === 'b2b' ? 'POST' : 'GET2',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer " + encrptedSession,
                                Origin: '*'
                            }
                        };
                        return [4 /*yield*/, this.sendRequest(options_1)];
                    case 4:
                        transaction = _a.sent();
                        if (transaction)
                            return [2 /*return*/, transaction];
                        else
                            return [2 /*return*/, false];
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, false];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, false];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, false];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _a.sent();
                        console.error(error_1.message);
                        return [2 /*return*/, false];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    mpesa.prototype.sendRequest = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var response, response, response, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        if (!(options.method === 'GET')) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(options.path, { headers: options.headers })];
                    case 1:
                        response = _a.sent();
                        if (response.data.output_ResponseCode === 'INS-0')
                            return [2 /*return*/, response.data.output_SessionID];
                        else
                            return [2 /*return*/, false];
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(options.method === 'POST')) return [3 /*break*/, 4];
                        return [4 /*yield*/, axios_1.default.post(options.path, JSON.stringify(options.body), { headers: options.headers })];
                    case 3:
                        response = _a.sent();
                        if (response.data.output_ResponseCode === 'INS-0')
                            return [2 /*return*/, response.data];
                        else
                            return [2 /*return*/, false];
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(options.method === 'PUT')) return [3 /*break*/, 6];
                        return [4 /*yield*/, axios_1.default.put(options.path, JSON.stringify(options.body), { headers: options.headers })];
                    case 5:
                        response = _a.sent();
                        if (response.data.output_ResponseCode === 'INS-0')
                            return [2 /*return*/, response.data];
                        else
                            return [2 /*return*/, false];
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, axios_1.default.get(options.path, { headers: options.headers })];
                    case 7:
                        response = _a.sent();
                        if (response.data.output_ResponseCode === 'INS-0')
                            return [2 /*return*/, response.data];
                        else
                            return [2 /*return*/, false];
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_2 = _a.sent();
                        console.error(error_2.message);
                        return [2 /*return*/, false];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    mpesa.prototype.c2b = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        client.type = 'c2b';
                        client.input_Country = country;
                        client.input_Currency = currency;
                        client.path = host + "/" + client.app + "/" + transact.c2b;
                        return [4 /*yield*/, this.createSession(client)];
                    case 1:
                        response = _a.sent();
                        if (response)
                            return [2 /*return*/, response];
                        else
                            return [2 /*return*/, false];
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    mpesa.prototype.b2c = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        client.type = 'b2c';
                        client.input_Country = country;
                        client.input_Currency = currency;
                        client.path = host + "/" + client.app + "/" + transact.b2c;
                        return [4 /*yield*/, this.createSession(client)];
                    case 1:
                        response = _a.sent();
                        if (response)
                            return [2 /*return*/, response];
                        else
                            return [2 /*return*/, false];
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error(error_4.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    mpesa.prototype.b2b = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        client.type = 'b2b';
                        client.input_Country = country;
                        client.input_Currency = currency;
                        client.path = host + "/" + client.app + "/" + transact.b2b;
                        return [4 /*yield*/, this.createSession(client)];
                    case 1:
                        response = _a.sent();
                        if (response)
                            return [2 /*return*/, response];
                        else
                            return [2 /*return*/, false];
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error(error_5.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    mpesa.prototype.reverse = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        client.type = 'reversal';
                        client.input_Country = country;
                        client.path = host + "/" + client.app + "/" + transact.reversal;
                        return [4 /*yield*/, this.createSession(client)];
                    case 1:
                        response = _a.sent();
                        if (response)
                            return [2 /*return*/, response];
                        else
                            return [2 /*return*/, false];
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.error(error_6.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    mpesa.prototype.status = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        client.type = 'status';
                        client.input_Country = country;
                        client.path = host + "/" + client.app + "/" + transact.status + "?input_QueryReference=" + client.input_QueryReference + "&input_ServiceProviderCode=" + client.input_ServiceProviderCode + "&input_ThirdPartyConversationID=" + client.input_ThirdPartyConversationID + "&input_Country=" + client.input_Country;
                        return [4 /*yield*/, this.createSession(client)];
                    case 1:
                        response = _a.sent();
                        if (response)
                            return [2 /*return*/, response];
                        else
                            return [2 /*return*/, false];
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        console.error(error_7.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return mpesa;
}());
var MPESA = new mpesa();
exports.MPESA = MPESA;
