import { Request, Response } from "express"

import { TimerState } from "./utils/timer"
import { ApiError } from "../../types/apiError"
import { timersStorage } from "./utils/timersStorage"
const timers = timersStorage.init()

type StartRequestParams = {
  auctionId: string
}



const start = async (req: Request<StartRequestParams>, res: Response<TimerState | ApiError>) => {
  const auctionId = req.params.auctionId

  if (!auctionId) {
    res.status(400).send({ error: 'Не указан ID аукциона в запросе' })
    return
  }

  const timer = timers.getStorageTimer(auctionId)
  timer.start()
  res.status(200).send(timer.getData())
}


export default start