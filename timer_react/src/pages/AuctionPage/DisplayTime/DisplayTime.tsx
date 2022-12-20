import React from 'react'
import { Timer } from '../../../types/timer.type'
import styles from './displaytime.module.css'

type DisplayTimeProps = Timer

const DisplayTime: React.FC<DisplayTimeProps> = (props) => {

  const minutes = Math.floor((props.loopDuration - props.secondsPassed) / 60)
  const seconds = (props.loopDuration - props.secondsPassed) % 60

  return (
    <div className={ styles.clock }>
      {twoDigits(minutes)}:{twoDigits(seconds)}
    </div>
  )


}

export default DisplayTime


function twoDigits(value: number): string {
  return value < 10 ? `0${value}` : `${value}`
}