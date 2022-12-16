import { Auction, AuctionId, getNewAuction, addParticipant, removeParticipant, getWebsockets } from './auction'
import { JustResult, ResultType } from '../../../types/result'
import { Participant } from '../participants/participant'
import { UserId } from '../../users/users'
import WebSocket from 'ws'

type AuctionsStore = {
  getAuction: (auctionId: AuctionId) => Auction
  removeAuction: (auctionId: AuctionId) => JustResult
  addParticipantToAuction: (auctionId: AuctionId, participant: Participant) => JustResult
  removeParticipantFromAuction: (auctionId: AuctionId, userId: UserId) => JustResult
  getAuctionWebsockets: (auctionId: AuctionId) => WebSocket[]
  getAuctionParticipants: (auctionId: AuctionId) => UserId[]
}

export const auctions = auctionsStoreFactory().init()


function auctionsStoreFactory() {
  let instance: AuctionsStore
  return {
    init: () => {
      if (!instance) instance = _auctionsStore()
      return instance
    }
  }
}


function _auctionsStore() {
  let auctions = new Map<AuctionId, Auction>()

  /**
   *  Проверяет, создан ли уже такой аукцион. Возвращает его.
   *  Логика, что делать, если таймера / аукциона не существует, здесь опущена. Просто создаем новый аукцион
   */
  function getAuction(auctionId: string): Auction {
    const oldAuction = auctions.get(auctionId)
    if (oldAuction !== undefined) {
      return oldAuction
    }
    const newAuction = getNewAuction(auctionId)
    auctions.set(auctionId, newAuction)
    return newAuction
  }

  /**
  *  Просто сбрасываем таймеры и удаляем аукцион из хранилища
  */
  function removeAuction(auctionId: string): JustResult {
    const oldAuction = auctions.get(auctionId)
    if (oldAuction !== undefined) oldAuction.timer.drop()
    auctions.delete(auctionId)
    return ResultType.Ok
  }

  /** Добавляем участника в аукцион */
  function addParticipantToAuction(auctionId: AuctionId, participant: Participant): JustResult {
    const auction = auctions.get(auctionId)
    if (!auction) return ResultType.Error

    auctions.set(auctionId, addParticipant(auction, participant))
    return ResultType.Ok
  }

  /** Удаляем участника из аукциона */
  function removeParticipantFromAuction(auctionId: AuctionId, userId: UserId): JustResult {
    const auction = auctions.get(auctionId)
    if (!auction) return ResultType.Error

    auctions.set(auctionId, removeParticipant(auction, userId))
    return ResultType.Ok
  }

  /** Получаем список websocket для уведомлений */
  function getAuctionWebsockets(auctionId: AuctionId): WebSocket[] {
    const auction = auctions.get(auctionId)
    if (!auction) return []
    return getWebsockets(auction)
  }


  /** Получаем список пользователей */
  function getAuctionParticipants(auctionId: AuctionId): UserId[] {
    const auction = auctions.get(auctionId)
    if (!auction) return []
    return Array.from(auction.participants.values()).map(x => x.userId)
  }


  return {
    getAuction,
    removeAuction,
    addParticipantToAuction,
    removeParticipantFromAuction,
    getAuctionWebsockets,
    getAuctionParticipants
  }

}

