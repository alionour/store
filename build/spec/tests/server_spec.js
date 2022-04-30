"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/server"));
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
it('Server is running fine', (done) => {
    (0, supertest_1.default)(server_1.default).get('/').expect(200).expect('Content-Type', /json/)
        .end(function (err, _res) {
        if (err)
            throw err;
        done();
    });
});
//# sourceMappingURL=server_spec.js.map