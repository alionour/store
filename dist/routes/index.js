"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.__esModule = true;
var express = __importStar(require("express"));
var authentication_1 = __importDefault(require("./apis/authentication"));
var categories_1 = __importDefault(require("./apis/categories"));
var orders_1 = __importDefault(require("./apis/orders"));
var products_1 = __importDefault(require("./apis/products"));
var users_1 = __importDefault(require("./apis/users"));
// eslint-disable-next-line new-cap
var router = express.Router();
router.get('/api', function (req, res) {
    res.json('API');
});
router.use('/api/products', products_1["default"]);
router.use('/api/categories', categories_1["default"]);
router.use('/api/users', users_1["default"]);
router.use('/api/orders', orders_1["default"]);
router.use('/', authentication_1["default"]);
exports["default"] = router;
