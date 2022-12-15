"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimer = exports.TimerEvents = exports.TimerStatus = void 0;
const events_1 = __importDefault(require("events"));
const participantsStorage_1 = require("../participants/participantsStorage");
const LOOP_DURATION_SECONDS = 60 * 2;
const ONE_SECOND = 1000;
var TimerStatus;
(function (TimerStatus) {
    TimerStatus["Working"] = "Working";
    TimerStatus["Stopped"] = "Stopped";
})(TimerStatus = exports.TimerStatus || (exports.TimerStatus = {}));
var TimerEvents;
(function (TimerEvents) {
    TimerEvents["NextSecond"] = "NextSecond";
})(TimerEvents = exports.TimerEvents || (exports.TimerEvents = {}));
const getTimer = (auctionId) => {
    let timerState = getInitTimerState();
    let timerTimeout;
    const auctionEvents = new events_1.default();
    const emitSecondsPassed = () => {
        console.log(auctionId, timerState.secondsPassed);
        auctionEvents.emit(TimerEvents.NextSecond, auctionId, timerState.secondsPassed);
        const wsList = participantsStorage_1.participants.getAuctionParticipants(auctionId);
        wsList.forEach(ws => ws.send(JSON.stringify({ auctionId, seconds: timerState.secondsPassed })));
    };
    /** Данные таймера */
    const getData = () => {
        return timerState;
    };
    /** Запуск таймера */
    function start() {
        timerState = Object.assign(Object.assign({}, drop()), { status: TimerStatus.Working });
        const incrementSecondsLoop = () => {
            timerTimeout = setTimeout(() => {
                timerState =
                    (timerState.secondsPassed < (LOOP_DURATION_SECONDS - 1))
                        ? addSecond(timerState)
                        : newLoop(timerState);
                emitSecondsPassed();
                incrementSecondsLoop();
            }, ONE_SECOND);
        };
        emitSecondsPassed();
        incrementSecondsLoop();
        return getData();
    }
    /** Сброс таймера */
    function drop() {
        clearTimeout(timerTimeout);
        timerState = Object.assign(Object.assign({}, timerState), { status: TimerStatus.Stopped });
        return getData();
    }
    /** Данные таймера,синхронизированные с переключением секунд */
    function getSyncData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (timerState.status === TimerStatus.Stopped)
                return getData();
            yield waitForNextSecond(auctionEvents);
            return getData();
        });
    }
    return { getData, getSyncData, start, drop, auctionEvents };
};
exports.getTimer = getTimer;
function getInitTimerState() {
    return {
        status: TimerStatus.Stopped,
        startAt: Date.now(),
        loopDurationSeconds: LOOP_DURATION_SECONDS,
        secondsPassed: 0,
    };
}
function waitForNextSecond(events) {
    return new Promise((resolve, _reject) => {
        events.once(TimerEvents.NextSecond, resolve);
    });
}
function addSecond(state) {
    return Object.assign(Object.assign({}, state), { secondsPassed: state.secondsPassed + 1 });
}
function newLoop(state) {
    return Object.assign(Object.assign({}, state), { secondsPassed: 0 });
}
