import express from 'express'

import deleteTimer from './delete'
import get from './get'
import start from './start'


const router = express.Router()
router.post('/:auctionId', start)
router.get('/:auctionId', get)
router.delete('/:auctionId', deleteTimer)

export default router
