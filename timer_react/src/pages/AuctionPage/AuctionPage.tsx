import React from 'react'
import { useParams } from 'react-router-dom'
import DisplayTime from './DisplayTime/DisplayTime'

type AuctionPageProps = {}

const AuctionPage: React.FC<AuctionPageProps> = (_props) => {
  const { auctionId } = useParams()

  return (
    <>
      <h2>Аукцион: { auctionId }</h2>
      <DisplayTime
        loopDuration={ 120 }
        secondsPassed={ 60 }
      />
    </>
  )
}

export default AuctionPage