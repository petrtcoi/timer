import { Route, Routes } from "react-router-dom"

import AuctionPage from "./pages/AuctionPage/AuctionPage"
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import HomePage from "./pages/HomePage/HomePage"
import InspectPage from "./pages/InspectPage/InspectPage"

function App() {

  return (
    <div className="App">
      <h1>Таймер</h1>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/_inspect" element={ <InspectPage /> } />
        <Route path="/auctions/:auctionId" element={ <AuctionPage /> } />
        <Route path="/*" element={ <ErrorPage /> } />
      </Routes>
    </div>
  )
}

export default App
