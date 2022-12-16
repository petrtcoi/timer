import { Result, ResultType } from "../../../types/result"
import { auctions} from "./../auctions/auctionsStore"
import WebSocket from 'ws'

export type Participant = { ws: WebSocket }
export type ParticipansStorage = {
  addToAuction: (ws: WebSocket, auctionId: string) => Result,
  removeFromAction: (ws: WebSocket, auctionId: string) => Result,
  removeFromEverywhere: (ws: WebSocket) => Result,
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
  function addToAuction(ws: WebSocket, auctionId: string): Result {
    const auction = auctions.getAuction(auctionId)
    if (!auction) return [ResultType.Error, 'Не удалось удалить']

    const auctionParticipants = participants.get(auctionId)
    if (!auctionParticipants) {
      participants.set(auctionId, new Map([[ws, true]]))
      return [ResultType.Ok, '']
    }

    auctionParticipants.set(ws, true)
    return [ResultType.Ok, '']
  }

  /**
   * Удаляем websoket из аукциона
   */
  function removeFromAction(ws: WebSocket, auctionId: string): Result {
    const auctionParticipants = participants.get(auctionId)
    if (!auctionParticipants) return [ResultType.Skipped, '']
    auctionParticipants.delete(ws)
    return [ResultType.Ok, '']
  }

  /**
   * Удаляем websoket из всех аукционов
   */
  function removeFromEverywhere(ws: WebSocket): Result {
    participants.forEach(auctionParticipants => {
      auctionParticipants.delete(ws)
    })
    return [ResultType.Ok, '']
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
