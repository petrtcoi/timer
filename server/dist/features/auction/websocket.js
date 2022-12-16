"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
const ws_1 = require("ws");
const auctionsStore_1 = require("./auctions/auctionsStore");
var MessageType;
(function (MessageType) {
    MessageType["SubscribeAuction"] = "SubscribeAuction";
    MessageType["LeaveAuction"] = "LeaveAuction";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function default_1(server) {
    const wss = new ws_1.WebSocket.Server({ noServer: true });
    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
            const wsd = ws;
            const { type, auctionId, userId } = JSON.parse(data);
            if (!type || !auctionId || !userId)
                return;
            switch (type) {
                case MessageType.SubscribeAuction:
                    auctionsStore_1.auctions.addParticipantToAuction(auctionId, { userId, ws: wsd });
                    break;
                case MessageType.LeaveAuction:
                    auctionsStore_1.auctions.removeParticipantFromAuction(auctionId, userId);
                    break;
            }
        });
        ws.send('something');
    });
    return wss;
}
exports.default = default_1;
