"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var gameoflife_1 = require("./gameoflife");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.post("/start", function (req, res) {
    var universe = (0, gameoflife_1.startNewGame)(req.body.height, req.body.width, req.body.pattern);
    res.json({
        tickNumber: 0,
        universe: universe,
    });
});
exports.app.post("/tick", function (req, res) {
    res.statusCode = 404;
    res.send();
});
exports.app.listen(3000, function () {
    console.log("App is listening on port 3000!");
});
