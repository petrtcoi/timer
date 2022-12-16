import { AuctionTimer } from "../timer/auctionTimer"

export type AuctionId = string

export type Auction = {
  id: AuctionId,
  timer: AuctionTimer
  websockets: WebSocket[]
}