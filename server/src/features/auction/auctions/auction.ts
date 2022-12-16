import { UserId } from "../../users/users"
import WebSocket from 'ws'
import { AuctionTimer, getTimer } from "../timer/auctionTimer"
import { Participant } from '../participants/participant'

export type AuctionId = string

export type Auction = {
  id: AuctionId,
  timer: AuctionTimer
  participants: Map<UserId, Participant>
}

export function getNewAuction(auctionId: AuctionId): Auction {
  return {
    id: auctionId,
    timer: getTimer(auctionId),
    participants: new Map<UserId, Participant>()
  }
}

export function addParticipant(auction: Auction, participant: Participant): Auction {
  return {
    ...auction,
    participants:
      auction.participants.set(participant.userId, participant)
  }
}

export function removeParticipant(auction: Auction, userId: UserId): Auction {
  const { participants } = auction
  participants.delete(userId)

  return {
    ...auction,
    participants
  }
}

export function getWebsockets(auction: Auction): WebSocket[] {
  const participants = Array.from(auction.participants.values())
  return participants.map(p => p.ws).filter(Boolean) as WebSocket[]
}