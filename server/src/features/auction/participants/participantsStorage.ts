import { JustResult, ResultType } from "../../../types/result"
import { auctions } from "./../auctions/auctionsStore"
import WebSocket from 'ws'

export type Participant = { ws: WebSocket }
export type ParticipansStorage = {
  addToAuction: (ws: WebSocket, auctionId: string) => JustResult,
  removeFromAction: (ws: WebSocket, auctionId: string) => JustResult,
  removeFromEverywhere: (ws: WebSocket) => JustResult,
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



function _participantsStorage(): ParticipansStorage {
  const participants = new Map<string, Map<WebSocket, true>>()
  /**
   * Добавляем websocket в аукцион
   */
  function addToAuction(ws: WebSocket, auctionId: string): JustResult {
    const auction = auctions.getAuction(auctionId)
    if (!auction) return ResultType.Error

    const auctionParticipants = participants.get(auctionId)
    if (!auctionParticipants) {
      participants.set(auctionId, new Map([[ws, true]]))
      return ResultType.Ok
    }

    auctionParticipants.set(ws, true)
    return ResultType.Ok
  }

  /**
   * Удаляем websoket из аукциона
   */
  function removeFromAction(ws: WebSocket, auctionId: string): JustResult {
    const auctionParticipants = participants.get(auctionId)
    if (!auctionParticipants) return ResultType.Skipped
    auctionParticipants.delete(ws)
    return ResultType.Ok
  }

  /**
   * Удаляем websoket из всех аукционов
   */
  function removeFromEverywhere(ws: WebSocket): JustResult {
    participants.forEach(auctionParticipants => {
      auctionParticipants.delete(ws)
    })
    return ResultType.Ok
  }

  /**
   * Массив websocket для данного аукциона
   */
  function getAuctionParticipants(auctionId: string): WebSocket[] {
    const auctionParticipants = participants.get(auctionId)
    return Array.from(auctionParticipants?.keys() || [])
  }


  return { addToAuction, removeFromAction, removeFromEverywhere, getAuctionParticipants }
}
