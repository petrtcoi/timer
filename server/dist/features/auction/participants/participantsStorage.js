"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participants = void 0;
const result_1 = require("../../../types/result");
const auctionsStore_1 = require("./../auctions/auctionsStore");
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
        const auction = auctionsStore_1.auctions.getAuction(auctionId);
        if (!auction)
            return [result_1.ResultType.Error, 'Не удалось удалить'];
        const auctionParticipants = participants.get(auctionId);
        if (!auctionParticipants) {
            participants.set(auctionId, new Map([[ws, true]]));
            return [result_1.ResultType.Ok, ''];
        }
        auctionParticipants.set(ws, true);
        return [result_1.ResultType.Ok, ''];
    }
    /**
     * Удаляем websoket из аукциона
     */
    function removeFromAction(ws, auctionId) {
        const auctionParticipants = participants.get(auctionId);
        if (!auctionParticipants)
            return [result_1.ResultType.Skipped, ''];
        auctionParticipants.delete(ws);
        return [result_1.ResultType.Ok, ''];
    }
    /**
     * Удаляем websoket из всех аукционов
     */
    function removeFromEverywhere(ws) {
        participants.forEach(auctionParticipants => {
            auctionParticipants.delete(ws);
        });
        return [result_1.ResultType.Ok, ''];
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
