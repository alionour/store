"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../src/config/database"));
it('should behave... dbClient is defined ', () => {
    expect(database_1.default).toBeDefined();
});
//# sourceMappingURL=database_spec.js.map