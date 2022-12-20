import axios from 'axios'
import React from 'react'
import { Auction } from '../../types/auction'

type InspectPageProps = {}

let indent = 0

const InspectPage: React.FC<InspectPageProps> = (_props) => {

  const [auctionState, setAuctionState] = React.useState<Auction[]>()

  /** INFINITY LOOP! */
  React.useEffect(() => {
    (async () => {
      const res = await axios.get<Auction[]>('http://45.12.18.61/auction/_inspect_')
      setAuctionState(res.data)
    })()
  })

  if (!auctionState) return (<>Loading...</>)

  return (
    <>
      <h2>Состояние auctionsState</h2>
      <div>
        { auctionState.map(auction => {
          return (
            <ul key={ auction.id } style={ { marginBottom: "40px" } }>
              { Object.entries(auction).map(([key, value]) => {
                return (
                  <li >
                    { `${key}:\t${typeof value === 'object' ? JSON.stringify(value) : value}` }
                  </li>
                )
              }) }
            </ul>
          )
        }
        ) }
      </div>
    </>
  )
}

export default InspectPage