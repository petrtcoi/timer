import app from "../../app"

const LOOP_DURATION = 1000 * 60 * 2
const ONE_SECOND = 1000

export enum TimerStatus {
  Working = 'Working',
  Stopped = 'Stopped'
}
type TimerData = {
  status: TimerStatus,
  loopDurationMs: number
  startAt: number,
  secondsLeft: number
}
type GetTimerReturn = {
  getTimerData: () => TimerData,
  dropTimer: () => TimerData
  launchTimer: () => TimerData
}


export const getTimer = (): GetTimerReturn => {

  let status: TimerStatus = TimerStatus.Stopped
  let startAt: number
  let secondsLeft: number
  let timerMainLoop: any
  let timerSecondsLoop: any



  /**
   * Запускает таймер - запускает циклы setTimeout для 2 минутного цикла и секундного цикла внутри
   */
  const launchTimer = () => {
    startAt = Date.now()
    secondsLeft = 0
    status = TimerStatus.Working

    const incrementSecondsLeftLoop = () => {
      timerSecondsLoop = setTimeout(() => {
        secondsLeft += 1
        app.emit('tick', [secondsLeft, status])
        incrementSecondsLeftLoop()
      }, ONE_SECOND)
    }
    const dropSecondsLeft = () => {
      incrementSecondsLeftLoop()
      timerMainLoop = setTimeout(() => {
        secondsLeft = 0
        dropSecondsLeft()
      }, LOOP_DURATION)
    }
    dropSecondsLeft()
    return getTimerData()
  }


  /**
   * Передает текущие данные таймера
   */
  const getTimerData = () => {
    return { status, startAt, secondsLeft, loopDurationMs: LOOP_DURATION }
  }

  
  /**
   * Сбрасывает таймер - переводит статус в неработающий, очищает все таймеры
   */
  const dropTimer = () => {
    clearTimeout(timerMainLoop)
    clearTimeout(timerSecondsLoop)
    status = TimerStatus.Stopped
    return getTimerData()
  }


  return { dropTimer, getTimerData, launchTimer }
}