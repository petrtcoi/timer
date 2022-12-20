export enum TimerStatus {
  Working = 'Working',
  Stopped = 'Stopped'
}
export enum MessageType {
  SubscribeAuction = 'SubscribeAuction',
  LeaveAuction = 'LeaveAuction'
}
export type TimerDto = {
  auctionId: string,
  status: TimerStatus,
  startAt: number,
  loopDurationSeconds: number,
  secondsPassed: number
}
export type TimerWsDto = {
  auctionId: string,
  seconds: number
}