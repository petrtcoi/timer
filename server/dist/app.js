"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = require("./env.config");
const timer_1 = require("./endpoints/timer/timer");
(0, env_config_1.dotenvConfig)();
Object.freeze(Object.prototype);
const app = (0, express_1.default)();
const { getTimerData, dropTimer } = (0, timer_1.getTimer)();
// MIDDLEWARE
app.use((0, cors_1.default)());
// ROUTERS
app.get('/', (_, res) => {
    res.status(200).send('Im alive');
    return;
});
app.get('/timer', (_, res) => {
    res.status(200).send({
        timer: getTimerData(),
        status: timer_1.TimerStatus.Working
    });
});
app.delete('/timer', (_, res) => {
    dropTimer();
    res.status(200).send({
        timer: getTimerData(),
        status: timer_1.TimerStatus.Stopped
    });
});
exports.default = app;
