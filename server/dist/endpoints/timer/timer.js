"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimer = exports.TimerStatus = void 0;
const app_1 = __importDefault(require("../../app"));
const LOOP_DURATION = 1000 * 60 * 2;
const ONE_SECOND = 1000;
var TimerStatus;
(function (TimerStatus) {
    TimerStatus["Working"] = "Working";
    TimerStatus["Stopped"] = "Stopped";
})(TimerStatus = exports.TimerStatus || (exports.TimerStatus = {}));
const getTimer = () => {
    let status = TimerStatus.Stopped;
    let startAt;
    let secondsLeft;
    let timerMainLoop;
    let timerSecondsLoop;
    const launchTimer = () => {
        startAt = Date.now();
        secondsLeft = 0;
        status = TimerStatus.Working;
        const incrementSecondsLeftLoop = () => {
            timerSecondsLoop = setTimeout(() => {
                secondsLeft += 1;
                app_1.default.emit('tick', [secondsLeft, status]);
                incrementSecondsLeftLoop();
            }, ONE_SECOND);
        };
        const dropSecondsLeft = () => {
            incrementSecondsLeftLoop();
            timerMainLoop = setTimeout(() => {
                secondsLeft = 0;
                dropSecondsLeft();
            }, LOOP_DURATION);
        };
        dropSecondsLeft();
        return getTimerData();
    };
    const getTimerData = () => {
        return { status, startAt, secondsLeft, loopDurationMs: LOOP_DURATION };
    };
    const dropTimer = () => {
        clearTimeout(timerMainLoop);
        clearTimeout(timerSecondsLoop);
        status = TimerStatus.Stopped;
        return getTimerData();
    };
    return { dropTimer, getTimerData, launchTimer };
};
exports.getTimer = getTimer;
