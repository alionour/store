"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const { NODE_ENV, PORT, PORT_TEST } = process.env;
// Here we are configuring express to use body-parser as middle-ware.
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// for cors
app.use((0, cors_1.default)());
app.get('/', function (_req, res) {
    res.status(200);
    res.json('Hello World!');
});
app.use(routes_1.default);
if (NODE_ENV === 'dev') {
    // for logging
    app.use((0, morgan_1.default)('short'));
    // app listening
    app.listen(PORT, function () {
        console.log(`starting dev app on: http://localhost:${PORT}`);
    });
}
else if (NODE_ENV === 'test') {
    app.listen(PORT_TEST, function () {
        console.log(`starting test app on: http://localhost:${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map