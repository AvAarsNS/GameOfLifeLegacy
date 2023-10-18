"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.post("/start", function (req, res) {
    var response = "Welcome to the galaxy";
    res.json({
        response: response,
    });
});
exports.app.listen(3000, function () {
    console.log("App is listening on port 3000!");
});
