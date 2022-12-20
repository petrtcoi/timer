export enum TimerStatus {
  Working = 'Working',
  Stopped = 'Stopped'
}
export type TimerDto = {

  auctionId: string,
  status: TimerStatus,
  startAt: number,
  loopDurationSeconds: number,
  secondsPassed: number

}