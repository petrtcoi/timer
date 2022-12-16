"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebsockets = exports.removeParticipant = exports.addParticipant = exports.getNewAuction = void 0;
const auctionTimer_1 = require("../timer/auctionTimer");
function getNewAuction(auctionId) {
    return {
        id: auctionId,
        timer: (0, auctionTimer_1.getTimer)(auctionId),
        participants: new Map()
    };
}
exports.getNewAuction = getNewAuction;
function addParticipant(auction, participant) {
    return Object.assign(Object.assign({}, auction), { participants: auction.participants.set(participant.userId, participant) });
}
exports.addParticipant = addParticipant;
function removeParticipant(auction, userId) {
    const { participants } = auction;
    participants.delete(userId);
    return Object.assign(Object.assign({}, auction), { participants });
}
exports.removeParticipant = removeParticipant;
function getWebsockets(auction) {
    const participants = Array.from(auction.participants.values());
    return participants.map(p => p.ws).filter(Boolean);
}
exports.getWebsockets = getWebsockets;
