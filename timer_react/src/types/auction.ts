import { TimerDto } from "./timerDto.type"

export type AuctionId = string
export type UserId = string
export type Participant = {
  userId: UserId
  ws: WebSocket 
}

export type Auction = {
  id: AuctionId,
  timer: TimerDto
  participants: Map<UserId, Participant>
  activeWebSockets: WebSocket[]
}