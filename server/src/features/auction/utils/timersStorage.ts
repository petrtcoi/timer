import { AuctionTimer, getTimer } from './timer'
export type TimerGetter = (auctionId: string) => AuctionTimer

type TimersStorage = {
  getStorageTimer: (auctionId: string) => AuctionTimer
  removeStorageTimer: (auctionId: string) => void
}

const timersStorageFactory = () => {
  let instance: TimersStorage
  return {
    init: () => {
      if (!instance) {
        instance = _timersStorage()
        return instance
      }
      return instance
    }
  }
}
export const timersStorage = timersStorageFactory()

function _timersStorage() {
  const timers = new Map<string, AuctionTimer>()

  /**
   *  Проверяет, создан ли уже такой таймер. Возвращает его.
   *  Логика, что делать, если таймера / аукциона не существует, здесь опущена. Просто создаем новый таймер
   */
  const getStorageTimer = (auctionId: string): AuctionTimer => {
    const oldTimer = timers.get(auctionId)
    if (oldTimer !== undefined) {
      return oldTimer
    }

    const newTimer = getTimer(auctionId)
    timers.set(auctionId, newTimer)
    return newTimer
  }


  /**
  *  Просто сбрасываем таймеры и удаляем таймер из хранилища
  */
  const removeStorageTimer = (auctionId: string): void => {
    const oldTimer = timers.get(auctionId)
    if (oldTimer !== undefined) oldTimer.drop()
    timers.delete(auctionId)
  }

  return { getStorageTimer, removeStorageTimer }

}