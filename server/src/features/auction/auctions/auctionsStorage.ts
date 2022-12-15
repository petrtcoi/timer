import EventEmmiter from 'events'
import { AuctionTimer, getTimer } from './auctionTimer'

type AuctionsStorage = {
  getStorageAuction: (auctionId: string) => AuctionTimer
  removeStorageAuction: (auctionId: string) => void
  getAllEventEmmiters: () => EventEmmiter[]
}


export const auctions = auctionsStorageFactory().init()



function auctionsStorageFactory() {
  let instance: AuctionsStorage
  return {
    init: () => {
      if (!instance) instance = _auctionsStorage()
      return instance
    }
  }
}


function _auctionsStorage() {
  let auctions = new Map<string, AuctionTimer>()

  /**
   *  Проверяет, создан ли уже такой аукцион. Возвращает его.
   *  Логика, что делать, если таймера / аукциона не существует, здесь опущена. Просто создаем новый аукцион
   */
  function getStorageAuction(auctionId: string): AuctionTimer {
    const oldAuction = auctions.get(auctionId)
    if (oldAuction !== undefined) {
      return oldAuction
    }
    const newAuction = getTimer(auctionId)
    auctions.set(auctionId, newAuction)
    return newAuction
  }

  /**
  *  Просто сбрасываем таймеры и удаляем аукцион из хранилища
  */
  function removeStorageAuction(auctionId: string): void {
    const oldAuction = auctions.get(auctionId)
    console.log('oldAuction : ', oldAuction)
    if (oldAuction !== undefined) oldAuction.drop()
    auctions.delete(auctionId)
  }

  /**
   * Список EventEmmiters
   */
  function getAllEventEmmiters() {
    return Array.from(auctions.values()).map(auction => auction.auctionEvents)
  }


  return { getStorageAuction, removeStorageAuction, getAllEventEmmiters }

}


