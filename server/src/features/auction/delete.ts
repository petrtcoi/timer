import { Request, Response } from "express"

import { ApiError } from "../../types/apiError"
import { timersStorage } from "./utils/timersStorage"

const timers = timersStorage.init()

type DeleteRequestParams = {
  auctionId: string
}



const deleteTimer = async (req: Request<DeleteRequestParams>, res: Response<string | ApiError>) => {
  const auctionId = req.params.auctionId

  if (!auctionId) {
    res.status(400).send({ error: 'Не указан ID аукциона в запросе' })
    return
  }
  timers.removeStorageTimer(auctionId)
  res.status(200).send(`timer ${auctionId} removed!`)
}


export default deleteTimer