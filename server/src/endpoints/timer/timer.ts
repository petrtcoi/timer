
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
}


export const getTimer = (): GetTimerReturn => {

  let startAt = Date.now()
  let status: TimerStatus = TimerStatus.Working
  let secondsLeft = 0
  let timerSecondsLeft: any


  const incrementSecondsLeftLoop = () => {
    setTimeout(() => {
      secondsLeft += 1
      incrementSecondsLeftLoop()
    }, ONE_SECOND)
  }
  const dropSecondsLeft = () => {
    incrementSecondsLeftLoop()
    timerSecondsLeft = setTimeout(() => {
      secondsLeft = 0
      dropSecondsLeft()
    }, LOOP_DURATION)
  }
  dropSecondsLeft()



  const getTimerData = () => { return { status, startAt, secondsLeft, loopDurationMs: LOOP_DURATION } }
  const dropTimer = () => {
    clearTimeout(timerSecondsLeft)
    status = TimerStatus.Stopped
    return getTimerData()
  }

  return { dropTimer, getTimerData }
}