"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewAuction = void 0;
const auctionTimer_1 = require("../timer/auctionTimer");
const getNewAuction = (auctionId) => {
    return {
        id: auctionId,
        timer: (0, auctionTimer_1.getTimer)(auctionId),
        websockets: []
    };
};
exports.getNewAuction = getNewAuction;
