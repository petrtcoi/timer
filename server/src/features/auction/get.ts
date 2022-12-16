import { Request, Response } from "express"
import { auctions } from "./auctions/auctionsStore"

import { TimerState } from "./timer/auctionTimer"
import { ApiError } from "../../types/apiError"



type GetRequestParams = {
  auctionId: string
}



const get = async (req: Request<GetRequestParams>, res: Response<TimerState | ApiError>) => {
  const auctionId = req.params.auctionId

  if (!auctionId) {
    res.status(400).send({ error: 'Не указан ID аукциона в запросе' })
    return
  }
  const auction = auctions.getAuction(auctionId)
  const data = await auction.timer.getSyncData()
  res.status(200).send(data)
}


export default get