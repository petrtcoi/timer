import { AuctionTimer, getTimer } from "../timer/auctionTimer"

export type AuctionId = string

export type Auction = {
  id: AuctionId,
  timer: AuctionTimer
  websockets: WebSocket[]
}

export const getNewAuction = (auctionId: AuctionId): Auction => {
  return {
    id: auctionId,
    timer: getTimer(auctionId),
    websockets: []
  }
}