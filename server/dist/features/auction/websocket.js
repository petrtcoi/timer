"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
const ws_1 = require("ws");
const participantsStorage_1 = require("./participants/participantsStorage");
var MessageType;
(function (MessageType) {
    MessageType["SubscribeAuction"] = "SubscribeAuction";
    MessageType["LeaveAuction"] = "LeaveAuction";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function default_1(server) {
    const wss = new ws_1.WebSocket.Server({ noServer: true });
    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
            const { type, auctionId } = JSON.parse(data);
            if (!type || !auctionId)
                return;
            switch (type) {
                case MessageType.SubscribeAuction:
                    participantsStorage_1.participants.addToAuction(ws, auctionId);
                    break;
                case MessageType.LeaveAuction:
                    participantsStorage_1.participants.removeFromAction(ws, auctionId);
                    break;
            }
        });
        ws.send('something');
    });
    return wss;
}
exports.default = default_1;
