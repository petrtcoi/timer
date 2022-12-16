import { Server, WebSocket } from "ws"
import { auctions } from './auctions/auctionsStore'




export enum MessageType {
  SubscribeAuction = 'SubscribeAuction',
  LeaveAuction = 'LeaveAuction'
}
export type SubscribeMessage = { type: string, auctionId: string }


export default function (server: Server) {
  const wss = new WebSocket.Server({ noServer: true })

  wss.on('connection', function connection(ws) {

    ws.on('message', function message(data) {

      const wsd: WebSocket = ws

      const { type, auctionId, userId } = JSON.parse(data as unknown as string)
      if (!type || !auctionId || !userId) return

      switch (type) {
        case MessageType.SubscribeAuction:
          auctions.addParticipantToAuction(auctionId, { userId, ws: wsd })
          break
        case MessageType.LeaveAuction:
          auctions.removeParticipantFromAuction(auctionId, userId)
          break
      }

    })
    ws.send('something')
  })




  return wss
}