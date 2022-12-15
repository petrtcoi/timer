import { Request, Response } from "express"

import { TimerState } from "./auctions/auctionTimer"
import { ApiError } from "../../types/apiError"
import { auctions } from "./auctions/auctionsStorage"

type StartRequestParams = {
  auctionId: string
}


const start = async (req: Request<StartRequestParams>, res: Response<TimerState | ApiError>) => {
  const auctionId = req.params.auctionId

  if (!auctionId) {
    res.status(400).send({ error: 'Не указан ID аукциона в запросе' })
    return
  }

  const auction = auctions.getStorageAuction(auctionId)
  auction.start()
  res.status(200).send(auction.getData())
}


export default start