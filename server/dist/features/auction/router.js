"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delete_1 = __importDefault(require("./routrerHandlers/delete"));
const get_1 = __importDefault(require("./routrerHandlers/get"));
const start_1 = __importDefault(require("./routrerHandlers/start"));
const router = express_1.default.Router();
router.post('/:auctionId', start_1.default);
router.get('/:auctionId', get_1.default);
router.delete('/:auctionId', delete_1.default);
exports.default = router;
