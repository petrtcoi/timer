import React from 'react'

type InspectPageProps = {}

const stateExample = {
  auctionId: 'ytwuewr',
  timer: {
    start: 12321,
    finish: 2323
  },
  participants: ['Petr', 'Mike']
}

let indent = 0

const InspectPage: React.FC<InspectPageProps> = (_props) => {
  return (
    <>
      <h2>Состояние auctionsState</h2>
      <p style={{whiteSpace: "pre-wrap"}}>
        {
          Object.entries(stateExample).map(([key, value]) => {
            return (
              <div>{
                `${key}:\t${typeof value === 'object' ? JSON.stringify(value) : value}`
                
                }</div>
            )
          })
        }
      </p>
    </>
  )
}

export default InspectPage