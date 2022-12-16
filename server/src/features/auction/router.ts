import express from 'express'

import deleteTimer from './routrerHandlers/delete'
import get from './routrerHandlers/get'
import start from './routrerHandlers/start'


const router = express.Router()
router.post('/:auctionId', start)
router.get('/:auctionId', get)
router.delete('/:auctionId', deleteTimer)

export default router
