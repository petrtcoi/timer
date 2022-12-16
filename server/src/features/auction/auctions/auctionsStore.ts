import { Auction, AuctionId, getNewAuction } from './auction'
import { JustResult, ResultType } from '../../../types/result'

type AuctionsStore = {
  getAuction: (auctionId: string) => Auction
  removeAuction: (auctionId: string) => JustResult
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




  return { getAuction, removeAuction }

}


