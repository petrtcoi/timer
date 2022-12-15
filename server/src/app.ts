import express, { Express } from 'express'
import cors from 'cors'
import { dotenvConfig } from './env.config'

import { TimerStatus, getTimer } from './endpoints/timer/timer'

dotenvConfig()
Object.freeze(Object.prototype)
const app: Express = express()

const { getTimerData, dropTimer, launchTimer } = getTimer()

// MIDDLEWARE
app.use(cors())

// ROUTERS
app.get('/', (_, res) => {
  res.status(200).send('Im alive')
  return
})



app.post('/timer', (_, res) => {
  res.status(200).send(launchTimer())
})
app.get('/timer', (_, res) => {
  res.status(200).send(getTimerData())
})
app.delete('/timer', (_, res) => {
  dropTimer()
  app.removeAllListeners('tick')
  res.status(200).send(getTimerData())
})


/**
 * Учет секунд ведется на стороне сервера и передается клиенту через SSE
 */
app.get('/timer_emit', (_, res) => {
  const { status } = getTimerData()
  if (status === TimerStatus.Working) {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    })
    res.flushHeaders()
    app.on('tick', (data) => {
      res.status(200)
        .write(`seconds: ${data}\n`)
    })
    return
  }
  res.status(500).send('Timer was stopped')
})



export default app