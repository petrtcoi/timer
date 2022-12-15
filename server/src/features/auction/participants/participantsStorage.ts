import { SomeResult } from "../../../types/someResult"
import { auctions} from "./../auctions/auctionsStorage"
import WebSocket from 'ws'

export type Participant = { ws: WebSocket }
export type ParticipansStorage = {
  addToAuction: (ws: WebSocket, auctionId: string) => SomeResult,
  removeFromAction: (ws: WebSocket, auctionId: string) => SomeResult,
  removeFromEverywhere: (ws: WebSocket) => SomeResult,
  getAuctionParticipants: (auctionId: string) => WebSocket[]
}


export const participants = participantsStorageFactory().init()

function participantsStorageFactory() {
  let instance: ParticipansStorage
  return {
    init: () => {
      if (!instance) instance = _participantsStorage()
      return instance
    }
  }
}



function _participantsStorage (): ParticipansStorage  {
  const participants = new Map<string, Map<WebSocket, true>>()
  /**
   * Добавляем websocket в аукцион
   */
  function addToAuction(ws: WebSocket, auctionId: string) {
    const auction = auctions.getStorageAuction(auctionId)
    if (!auction) return SomeResult.Error

    const auctionParticipants = participants.get(auctionId)
    if (!auctionParticipants) {
      participants.set(auctionId, new Map([[ws, true]]))
      return SomeResult.Ok
    }

    auctionParticipants.set(ws, true)
    return SomeResult.Ok
  }

  /**
   * Удаляем websoket из аукциона
   */
  function removeFromAction(ws: WebSocket, auctionId: string) {
    const auctionParticipants = participants.get(auctionId)
    if (!auctionParticipants) return SomeResult.Skip
    auctionParticipants.delete(ws)
    return SomeResult.Ok
  }

  /**
   * Удаляем websoket из всех аукционов
   */
  function removeFromEverywhere(ws: WebSocket) {
    participants.forEach(auctionParticipants => {
      auctionParticipants.delete(ws)
    })
    return SomeResult.Ok
  }

  /**
   * Массив websocket для данного аукциона
   */
  function getAuctionParticipants (auctionId: string): WebSocket[] {
    const auctionParticipants = participants.get(auctionId)
    return Array.from(auctionParticipants?.keys() || [])
  }
 

  return { addToAuction, removeFromAction, removeFromEverywhere, getAuctionParticipants }
}
