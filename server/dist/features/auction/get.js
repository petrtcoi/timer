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
const timersStorage_1 = require("./utils/timersStorage");
const timers = timersStorage_1.timersStorage.init();
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auctionId = req.params.auctionId;
    if (!auctionId) {
        res.status(400).send({ error: 'Не указан ID аукциона в запросе' });
        return;
    }
    console.log('start');
    const timer = timers.getStorageTimer(auctionId);
    console.log('timer: ', timer);
    const data = yield timer.getSyncData();
    console.log('data: ', data);
    res.status(200).send(data);
});
exports.default = get;