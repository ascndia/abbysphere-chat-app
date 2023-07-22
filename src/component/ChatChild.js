import React from 'react'
import { IoChevronDownCircle } from 'react-icons/io5'

export default function ChatChild(props) {

  const { isYou, message, sender } = props
  let pos = isYou ? 'RightChat' : 'LeftChat';
  let classes = `Message ${pos}`

  return (
    <div className={classes}>
        {props.message}
    </div>
  )
}
