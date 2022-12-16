"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctions = void 0;
const auction_1 = require("./auction");
const result_1 = require("../../../types/result");
exports.auctions = auctionsStoreFactory().init();
function auctionsStoreFactory() {
    let instance;
    return {
        init: () => {
            if (!instance)
                instance = _auctionsStore();
            return instance;
        }
    };
}
function _auctionsStore() {
    let auctions = new Map();
    /**
     *  Проверяет, создан ли уже такой аукцион. Возвращает его.
     *  Логика, что делать, если таймера / аукциона не существует, здесь опущена. Просто создаем новый аукцион
     */
    function getAuction(auctionId) {
        const oldAuction = auctions.get(auctionId);
        if (oldAuction !== undefined) {
            return oldAuction;
        }
        const newAuction = (0, auction_1.getNewAuction)(auctionId);
        auctions.set(auctionId, newAuction);
        return newAuction;
    }
    /**
    *  Просто сбрасываем таймеры и удаляем аукцион из хранилища
    */
    function removeAuction(auctionId) {
        const oldAuction = auctions.get(auctionId);
        if (oldAuction !== undefined)
            oldAuction.timer.drop();
        auctions.delete(auctionId);
        return result_1.ResultType.Ok;
    }
    /** Добавляем участника в аукцион */
    function addParticipantToAuction(auctionId, participant) {
        const auction = auctions.get(auctionId);
        if (!auction)
            return result_1.ResultType.Error;
        auctions.set(auctionId, (0, auction_1.addParticipant)(auction, participant));
        return result_1.ResultType.Ok;
    }
    /** Удаляем участника из аукциона */
    function removeParticipantFromAuction(auctionId, userId) {
        const auction = auctions.get(auctionId);
        if (!auction)
            return result_1.ResultType.Error;
        auctions.set(auctionId, (0, auction_1.removeParticipant)(auction, userId));
        return result_1.ResultType.Ok;
    }
    /** Получаем список websocket для уведомлений */
    function getAuctionWebsockets(auctionId) {
        const auction = auctions.get(auctionId);
        if (!auction)
            return [];
        return (0, auction_1.getWebsockets)(auction);
    }
    /** Получаем список пользователей */
    function getAuctionParticipants(auctionId) {
        const auction = auctions.get(auctionId);
        if (!auction)
            return [];
        return Array.from(auction.participants.values()).map(x => x.userId);
    }
    return {
        getAuction,
        removeAuction,
        addParticipantToAuction,
        removeParticipantFromAuction,
        getAuctionWebsockets,
        getAuctionParticipants
    };
}
