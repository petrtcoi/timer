import React from 'react'
import { useParams } from 'react-router-dom'
import DisplayTime from './DisplayTime/DisplayTime'
import { useTimer } from './hooks/useTimer'

type AuctionPageProps = {}

const AuctionPage: React.FC<AuctionPageProps> = (_props) => {
  const { auctionId } = useParams()

  const timer = useTimer(auctionId || 'test')

  return (
    <>
      <h2>Аукцион: { auctionId }</h2>
      <DisplayTime
        {...timer}
      />
    </>
  )
}

export default AuctionPage