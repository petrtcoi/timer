"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctions = void 0;
const auctionTimer_1 = require("./auctionTimer");
exports.auctions = auctionsStorageFactory().init();
function auctionsStorageFactory() {
    let instance;
    return {
        init: () => {
            if (!instance)
                instance = _auctionsStorage();
            return instance;
        }
    };
}
function _auctionsStorage() {
    let auctions = new Map();
    /**
     *  Проверяет, создан ли уже такой аукцион. Возвращает его.
     *  Логика, что делать, если таймера / аукциона не существует, здесь опущена. Просто создаем новый аукцион
     */
    function getStorageAuction(auctionId) {
        const oldAuction = auctions.get(auctionId);
        if (oldAuction !== undefined) {
            return oldAuction;
        }
        const newAuction = (0, auctionTimer_1.getTimer)(auctionId);
        auctions.set(auctionId, newAuction);
        return newAuction;
    }
    /**
    *  Просто сбрасываем таймеры и удаляем аукцион из хранилища
    */
    function removeStorageAuction(auctionId) {
        const oldAuction = auctions.get(auctionId);
        console.log('oldAuction : ', oldAuction);
        if (oldAuction !== undefined)
            oldAuction.drop();
        auctions.delete(auctionId);
    }
    /**
     * Список EventEmmiters
     */
    function getAllEventEmmiters() {
        return Array.from(auctions.values()).map(auction => auction.auctionEvents);
    }
    return { getStorageAuction, removeStorageAuction, getAllEventEmmiters };
}
