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
Object.defineProperty(exports, "__esModule", { value: true });
const auctionsStore_1 = require("./auctions/auctionsStore");
const deleteTimer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auctionId = req.params.auctionId;
    if (!auctionId) {
        res.status(400).send({ error: 'Не указан ID аукциона в запросе' });
        return;
    }
    auctionsStore_1.auctions.removeAuction(auctionId);
    res.status(200).send(`timer ${auctionId} removed!`);
});
exports.default = deleteTimer;
