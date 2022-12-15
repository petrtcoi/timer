"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timersStorage = void 0;
const timer_1 = require("./timer");
const timersStorageFactory = () => {
    let instance;
    return {
        init: () => {
            if (!instance) {
                instance = _timersStorage();
                return instance;
            }
            return instance;
        }
    };
};
exports.timersStorage = timersStorageFactory();
function _timersStorage() {
    const timers = new Map();
    /**
     *  Проверяет, создан ли уже такой таймер. Возвращает его.
     *  Логика, что делать, если таймера / аукциона не существует, здесь опущена. Просто создаем новый таймер
     */
    const getStorageTimer = (auctionId) => {
        const oldTimer = timers.get(auctionId);
        if (oldTimer !== undefined) {
            return oldTimer;
        }
        const newTimer = (0, timer_1.getTimer)(auctionId);
        timers.set(auctionId, newTimer);
        return newTimer;
    };
    /**
    *  Просто сбрасываем таймеры и удаляем таймер из хранилища
    */
    const removeStorageTimer = (auctionId) => {
        const oldTimer = timers.get(auctionId);
        if (oldTimer !== undefined)
            oldTimer.drop();
        timers.delete(auctionId);
    };
    return { getStorageTimer, removeStorageTimer };
}
