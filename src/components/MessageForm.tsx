import { useState } from 'react'
import {Textarea} from './ui/textarea'
import{Input} from './ui/input'
import{Button} from './ui/button'
 
const MessageForm = () => {

  const [message, setMessage] = useState<string>("");
  const [delay, setDelay] = useState<number>(10);
  const [isSending, setIsSending] = useState<boolean>(false);
  const[timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sentMessage, setSentMessage] = useState<string>("");


const handleSend = () => {
  setIsSending(true)

  const id = setTimeout (() =>{
    setSentMessage(message);
    setMessage("");
    setIsSending(false);
  }, delay*1000)

  setTimerId(id)
}

const handleCancel =() => {
  if(timerId) clearTimeout(timerId);
  setIsSending(false);
}

  return (
    <div className='max-w-md mx-auto mt-20 p-6 rounded-lg shadow-sm bg-white space-y-4'>
        <h2 className='text-2xl font-bold text-blue-600'>
            DM Delay Button
        </h2>

        <Textarea
        placeholder='Type your message...'
        value={message} 
        onChange={(e) => setMessage(e.target.value)}/>

        <Input type='number'
        placeholder='Delay in seconds'
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isSending}/>

       {!isSending ? (
         <Button className='w-full' onClick={handleSend}>
          Sent with delay
        </Button>
       ) :(
         <Button className='w-full' variant="destructive" onClick={handleCancel}>
          Cancel Sending
        </Button>
       )}

       {sentMessage && (
        <div className='bg-green-300 border rounded p-3 text-green-800'>
          <p className='font-semibold'>Message Sent:</p>
          <p>{sentMessage}</p>
        </div>
       )}
    </div>
  )
}

export default MessageForm