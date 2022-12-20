import React from 'react'

type HomePageProps = {}

const HomePage: React.FC<HomePageProps> = (_props) => {
  return(
    <div>
      <div>Страница аукциона: "/auction/:auctionID"</div>
      <div><a href="/_inspect" target="_blank">Инспекция всех аукционов</a></div>
    </div>
    
  )
}

export default HomePage