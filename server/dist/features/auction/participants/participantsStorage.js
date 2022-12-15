"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participants = void 0;
const someResult_1 = require("../../../types/someResult");
const auctionsStorage_1 = require("./../auctions/auctionsStorage");
exports.participants = participantsStorageFactory().init();
function participantsStorageFactory() {
    let instance;
    return {
        init: () => {
            if (!instance)
                instance = _participantsStorage();
            return instance;
        }
    };
}
function _participantsStorage() {
    const participants = new Map();
    /**
     * Добавляем websocket в аукцион
     */
    function addToAuction(ws, auctionId) {
        const auction = auctionsStorage_1.auctions.getStorageAuction(auctionId);
        if (!auction)
            return someResult_1.SomeResult.Error;
        const auctionParticipants = participants.get(auctionId);
        if (!auctionParticipants) {
            participants.set(auctionId, new Map([[ws, true]]));
            return someResult_1.SomeResult.Ok;
        }
        auctionParticipants.set(ws, true);
        return someResult_1.SomeResult.Ok;
    }
    /**
     * Удаляем websoket из аукциона
     */
    function removeFromAction(ws, auctionId) {
        const auctionParticipants = participants.get(auctionId);
        if (!auctionParticipants)
            return someResult_1.SomeResult.Skip;
        auctionParticipants.delete(ws);
        return someResult_1.SomeResult.Ok;
    }
    /**
     * Удаляем websoket из всех аукционов
     */
    function removeFromEverywhere(ws) {
        participants.forEach(auctionParticipants => {
            auctionParticipants.delete(ws);
        });
        return someResult_1.SomeResult.Ok;
    }
    /**
     * Массив websocket для данного аукциона
     */
    function getAuctionParticipants(auctionId) {
        const auctionParticipants = participants.get(auctionId);
        return Array.from((auctionParticipants === null || auctionParticipants === void 0 ? void 0 : auctionParticipants.keys()) || []);
    }
    return { addToAuction, removeFromAction, removeFromEverywhere, getAuctionParticipants };
}
