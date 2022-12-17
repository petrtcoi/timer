import React from 'react'
import { useParams } from 'react-router-dom'

type AuctionPageProps = {}

const AuctionPage: React.FC<AuctionPageProps> = (_props) => {
  const {auctionId}  = useParams()

  return(
    <h2>Аукцион: {auctionId}</h2>
  )
}

export default AuctionPage