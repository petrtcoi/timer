import { Request, Response } from "express"

import { TimerState } from "./utils/timer"
import { ApiError } from "../../types/apiError"
import { timersStorage } from "./utils/timersStorage"
const timers = timersStorage.init()

type GetRequestParams = {
  auctionId: string
}



const get = async (req: Request<GetRequestParams>, res: Response<TimerState | ApiError>) => {
  const auctionId = req.params.auctionId

  if (!auctionId) {
    res.status(400).send({ error: 'Не указан ID аукциона в запросе' })
    return
  }
  console.log('start')
  const timer = timers.getStorageTimer(auctionId)
  console.log('timer: ', timer)
  const data = await timer.getSyncData()
  console.log('data: ', data)
  res.status(200).send(data)
}


export default get