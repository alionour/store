"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var _a = process.env, NODE_ENV = _a.ENV, PORT = _a.PORT, PORT_TEST = _a.PORT_TEST, ADDRESS = _a.ADDRESS;
// Here we are configuring express to use body-parser as middle-ware.
app.use(express_1["default"].urlencoded({ extended: false }));
app.use(express_1["default"].json());
// for logging
app.use((0, morgan_1["default"])('short'));
app.use(routes_1["default"]);
app.get('/', function (_req, res) {
    res.status(200);
    res.json('Hello World!');
});
if (NODE_ENV === 'dev') {
    app.listen(PORT, function () {
        console.log("starting dev app on: http://".concat(ADDRESS));
    });
}
else if (NODE_ENV === 'test') {
    app.listen(PORT_TEST, function () {
        console.log("starting test app on: http://".concat(ADDRESS));
    });
}
exports["default"] = app;
