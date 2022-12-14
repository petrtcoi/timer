import express, { Express } from 'express'
import cors from 'cors'
import { dotenvConfig } from './env.config'

import { TimerStatus, getTimer } from './endpoints/timer/timer'

dotenvConfig()
Object.freeze(Object.prototype)
const app: Express = express()

const { getTimerData, dropTimer } = getTimer()

// MIDDLEWARE
app.use(cors())

// ROUTERS
app.get('/', (_, res) => {
  res.status(200).send('Im alive')
  return
})


app.get('/timer', (_, res) => {
  res.status(200).send({
    timer: getTimerData(),
    status: TimerStatus.Working
  })
})
app.delete('/timer', (_, res) => {
  dropTimer()
  res.status(200).send({
    timer: getTimerData(),
    status: TimerStatus.Stopped
  })
})



export default app