import EventEmmiter from 'events'

const LOOP_DURATION_SECONDS = 60 * 2
const ONE_SECOND = 1000

export enum TimerStatus {
  Working = 'Working',
  Stopped = 'Stopped'
}
export enum TimerEvents {
  NextSecond = 'NextSecond'
}
export type TimerState = {
  status: TimerStatus,
  loopDurationSeconds: number
  startAt: number,
  secondsPassed: number
}
export type AuctionTimer = {
  getData: () => TimerState
  getSyncData: () => Promise<TimerState>
  drop: () => TimerState
  start: () => TimerState
  auctionEvents: EventEmmiter
}


export const getTimer = (auctionId: string): AuctionTimer => {

  let timerState: TimerState = getInitTimerState()
  let timerTimeout: any
  const auctionEvents = new EventEmmiter()
  const emitSecondsPassed = () => {
    console.log(auctionId, timerState.secondsPassed)
    auctionEvents.emit(TimerEvents.NextSecond, timerState.secondsPassed)
  }


  /** Данные таймера */
  const getData = (): TimerState => {
    return timerState
  }

  /** Запуск таймера */
  function start(): TimerState {
    timerState = { ...drop(), status: TimerStatus.Working }

    emitSecondsPassed()
    const incrementSecondsLoop = () => {
      timerTimeout = setTimeout(() => {
        timerState =
          (timerState.secondsPassed < (LOOP_DURATION_SECONDS - 1))
            ? addSecond(timerState)
            : newLoop(timerState)
        emitSecondsPassed()
        incrementSecondsLoop()
      }, ONE_SECOND)
    }
    incrementSecondsLoop()

    return getData()
  }

  /** Сброс таймера */
  function drop(): TimerState {
    clearTimeout(timerTimeout)
    timerState = { ...timerState, status: TimerStatus.Stopped }
    return getData()
  }

  /** Данные таймера,синхронизированные с переключением секунд */
  async function getSyncData(): Promise<TimerState> {
    if (timerState.status === TimerStatus.Stopped) return getData()
    await waitForNextSecond(auctionEvents)
    return getData()
  }


  return { getData, getSyncData, start, drop, auctionEvents }
}



function getInitTimerState(): TimerState {
  return {
    status: TimerStatus.Stopped,
    startAt: Date.now(),
    loopDurationSeconds: LOOP_DURATION_SECONDS,
    secondsPassed: 0,
  }
}

function waitForNextSecond(events: EventEmmiter) {
  return new Promise((resolve, _reject) => {
    events.once(TimerEvents.NextSecond, resolve)
  })
}
function addSecond(state: TimerState): TimerState {
  return { ...state, secondsPassed: state.secondsPassed + 1 }
}
function newLoop(state: TimerState): TimerState {
  return { ...state, secondsPassed: 0 }
}
