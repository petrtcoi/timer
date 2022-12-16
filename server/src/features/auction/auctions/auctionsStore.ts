import { AuctionTimer, getTimer } from './../timer/auctionTimer'
import { AuctionId } from './auction'

type AuctionsStore = {
  getAuction: (auctionId: string) => AuctionTimer
  removeAuction: (auctionId: string) => void
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
  let auctions = new Map<AuctionId, AuctionTimer>()

  /**
   *  Проверяет, создан ли уже такой аукцион. Возвращает его.
   *  Логика, что делать, если таймера / аукциона не существует, здесь опущена. Просто создаем новый аукцион
   */
  function getAuction(auctionId: string): AuctionTimer {
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
  function removeAuction(auctionId: string): void {
    const oldAuction = auctions.get(auctionId)
    console.log('oldAuction : ', oldAuction)
    if (oldAuction !== undefined) oldAuction.drop()
    auctions.delete(auctionId)
  }




  return { getAuction, removeAuction }

}


