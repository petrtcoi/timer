import { Server, WebSocket } from "ws"
import { participants } from "./participants/participantsStorage"




export enum MessageType {
  SubscribeAuction = 'SubscribeAuction',
  LeaveAuction = 'LeaveAuction'
}
export type SubscribeMessage = { type: string, auctionId: string }


export default function (server: Server) {
  const wss = new WebSocket.Server({ noServer: true })

  wss.on('connection', function connection(ws) {

    ws.on('message', function message(data) {

      const { type, auctionId } = JSON.parse(data as unknown as string)
      if (!type || !auctionId) return

      switch (type) {
        case MessageType.SubscribeAuction:
          participants.addToAuction(ws, auctionId)
          break;
        case MessageType.LeaveAuction:
          participants.removeFromAction(ws, auctionId)
          break;
      }

    })
    ws.send('something')
  })




  return wss
}