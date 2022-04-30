"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
it('Server is running perfectly', (done) => {
    (0, supertest_1.default)(server_1.default).get('/').expect(200).expect('Content-Type', /json/)
        .set('Accept', 'application/json')
        .expect((res) => {
        res.body.data.length = 1;
    }).end(function (err, res) {
        if (err)
            throw err;
        console.log(res);
        done();
    });
});
//# sourceMappingURL=server_spec.js.map