import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

const styles = {
  text: classNames(['text-3xl', 'text-size', 'font-extrabold', 'text-lime-500']),
  button: classNames([
    'bg-blue-500',
    'hover:bg-blue-700',
    'text-white',
    'font-bold',
    'py-2',
    'px-4',
    'border',
    'border-blue-700',
    'rounded',
  ]),
  textBox: classNames(['border-solid', 'border-2', 'border-red-400']),
}

const HomeModule = () => {
  const ws = useRef(null)
  const [textMessage, setTextMessage] = useState('')
  const [receivedTxtMessages, setReceivedTxtMessages] = useState([])

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/ws')
    // ws.current.onopen = () => console.log('WS opened')
    // ws.current.onclose = () => console.log('WS closed')

    ws.current.addEventListener('open', () => console.log('WS opened'))
    ws.current.addEventListener('close', () => console.log('WS closed'))

    return () => ws.current.close()
  }, [])

  useEffect(() => {
    if (!ws.current) return
    ws.current.addEventListener('message', (evt) => {
      setReceivedTxtMessages([...receivedTxtMessages, evt.data])
    })
  })

  const handleInputText = (evt) => {
    setTextMessage(evt.target.value)
  }

  const handleSendBtn = (evt) => {
    evt.preventDefault()
    if (!ws.current) return
    ws.current.send(textMessage)
  }

  return (
    <>
      <div className="m-10 flex flex-col">
        <h1 className={styles.text}>WebSocket Chat</h1>
        <div className="flex flex-row">
          <input
            type="text"
            autoComplete="off"
            className={styles.textBox}
            value={textMessage}
            onChange={handleInputText}
          />
          <button className={styles.button} onClick={handleSendBtn}>
            Send
          </button>
        </div>
        <ul>
          {receivedTxtMessages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomeModule
