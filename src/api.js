"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var gameoflife_1 = require("./gameoflife");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)()); // Enable CORS
exports.app.use(express_1.default.json());
exports.app.post("/start", function (req, res) {
    var validPatterns = ["random", "glider", "beehive", "blinker"];
    if (!req.body.pattern || !validPatterns.includes(req.body.pattern)) {
        res.status(400).send("Invalid pattern");
        return;
    }
    var universe = (0, gameoflife_1.startNewGame)(req.body.height, req.body.width, req.body.pattern);
    res.json({
        tickNumber: 0,
        universe: universe,
    });
});
exports.app.post("/tick", function (req, res) {
    var nextUniverse = (0, gameoflife_1.generateNextTick)(req.body.universe);
    var tickNumber = req.body.tickNumber + 1;
    res.json({
        tickNumber: tickNumber,
        universe: nextUniverse,
    });
});
exports.app.listen(8088, function () {
    console.log("App is listening on port 9231803989839102!");
});
