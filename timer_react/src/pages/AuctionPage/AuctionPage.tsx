import React from 'react'
import { useParams } from 'react-router-dom'
import DisplayTime from './DisplayTime/DisplayTime'
import { useTimer } from './hooks/useTimer'
import { useTimerWs } from './hooks/useTimerWs'

type AuctionPageProps = {}

const AuctionPage: React.FC<AuctionPageProps> = (_props) => {
  const { auctionId } = useParams()


  const timerOne = useTimer(auctionId || 'test')


  const [userName, setUserName] = React.useState<string>('')
  const handleSubmit = (event: any) => {
    event.preventDefault()
    setUserName(event.target[0].value)
  }
  const seconds = useTimerWs(auctionId || 'test', userName)



  return (
    <div style={ { padding: "20px" } }>
      <h2>Аукцион: { auctionId }</h2>
      <div style={ { marginTop: "50px" } }>
        <DisplayTime
          { ...timerOne }
        />
        <p>Таймер 1: запускает таймер с указанным id при перезагрузке страницы. Далее делает GET запросы на сервер для получения текущего состояния счетчика. На сервере данные отдаются не сразу: сервер дожидается обновления секунды и после этого дает ответ. Таким образом,запросы идут раз в секунду.</p>
      </div>
      <div style={ { marginTop: "50px" } }>
        <DisplayTime
          loopDuration={ timerOne.loopDuration }
          secondsPassed={ seconds }
        />
        <form onSubmit={ handleSubmit }>
          <label>
            Имя пользователя:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>Таймер 2: Подключается к уже готовому счетчику через WebSocket и получает данные с сервера по этому каналу</p>
      </div>
    </div>
  )
}

export default AuctionPage