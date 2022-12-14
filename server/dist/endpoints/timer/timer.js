"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimer = exports.TimerStatus = void 0;
const LOOP_DURATION = 1000 * 60 * 2;
const ONE_SECOND = 1000;
var TimerStatus;
(function (TimerStatus) {
    TimerStatus["Working"] = "Working";
    TimerStatus["Stopped"] = "Stopped";
})(TimerStatus = exports.TimerStatus || (exports.TimerStatus = {}));
const getTimer = () => {
    let startAt = Date.now();
    let status = TimerStatus.Working;
    let secondsLeft = 0;
    let timerSecondsLeft;
    const incrementSecondsLeftLoop = () => {
        setTimeout(() => {
            secondsLeft += 1;
            incrementSecondsLeftLoop();
        }, ONE_SECOND);
    };
    const dropSecondsLeft = () => {
        incrementSecondsLeftLoop();
        timerSecondsLeft = setTimeout(() => {
            secondsLeft = 0;
            dropSecondsLeft();
        }, LOOP_DURATION);
    };
    dropSecondsLeft();
    const getTimerData = () => { return { status, startAt, secondsLeft, loopDurationMs: LOOP_DURATION }; };
    const dropTimer = () => {
        clearTimeout(timerSecondsLeft);
        status = TimerStatus.Stopped;
        return getTimerData();
    };
    return { dropTimer, getTimerData };
};
exports.getTimer = getTimer;
