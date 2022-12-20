import axios from 'axios'
import React from 'react'
import * as R from 'ramda'

import { Timer } from '../../../types/timer.type'
import { TimerDto } from '../../../types/timerDto.type'

const emptyTimer = { loopDuration: 0, secondsPassed: 0 }

// const apiURL = 'http://45.12.18.61/auction'
const apiUrl = 'http://localhost:3000/auction'



export function useTimer(auctionId: string): Timer {

  const [timer, setTimer] = React.useState<Timer>()
  React.useEffect(() => {
    (async () => setTimer(await startAuction(auctionId)))()
  }, [])
  React.useEffect(() => {
    (async () => setTimer(await getAuctionData(auctionId)))()
  }, [timer])


  return timer ? timer : emptyTimer
}

async function startAuction(auctionId: string): Promise<Timer> {
  return await R.pipe(
    R.always(axios.post<TimerDto>(`${apiUrl}/${auctionId}`)),
    R.andThen(timerFromResult),
    R.otherwise((R.always(emptyTimer))),
  )()
}
async function getAuctionData(auctionId: string): Promise<Timer> {
  return await R.pipe(
    R.always(axios.get<TimerDto>(`${apiUrl}/${auctionId}`)),
    R.andThen(timerFromResult),
    R.otherwise((R.always(emptyTimer))),
  )()
}



function timerFromResult(result: { data: TimerDto }): Timer {
  console.log(result)
  return ({
    loopDuration: R.view(R.lensProp('loopDurationSeconds'), result.data),
    secondsPassed: R.view(R.lensProp('secondsPassed'), result.data),
  })
}