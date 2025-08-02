import { useState } from 'react'
import {Textarea} from './ui/textarea'
import{Input} from './ui/input'
import{Button} from './ui/button'
import { Loader2, SendHorizonal, XCircle } from 'lucide-react'
 
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
    <div className='max-w-xl mx-auto px-4 sm:px-6 md:px-8 py-10 mt-10 sm:mt-20 rounded-2xl shadow-xl border border-gray-200 bg-gradient-to-tr form-white via-slate-50 to-slate-100 space-y-6 transition-all duration-300'>
        <h2 className='text-2xl sm:text-3xl font-bold text-blue-600 text-center'>
            Delay message Sender
        </h2>

      <p className="text-center text-sm sm:text-base text-gray-600">
        Write your message and schedule it to send later. You can cancel it anytime before the timer ends.
      </p>

        <Textarea
        placeholder='✍️ Type your message...'
        value={message}
        className='w-full min-h-[120px] rounded-xl border-2 border-gray-400 p-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base'
        onChange={(e) => setMessage(e.target.value)}/>

       <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0'>
         <Input type='number'
        min={1}
        placeholder='Delay in seconds'
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isSending}
        className='w-full sm:w-1/3 border-2 border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-base'/>

       {!isSending ? (
         <Button className='w-full sm:flex-1 bg-blue-500 hover:bg-blue-700 text-white rounded-xl shadow-md text-base' 
         onClick={handleSend}>
          <SendHorizonal className='h-5 w-5 mr-2'/>
          Sent with delay
        </Button>
       ) :(
         <Button className='w-full sm:flex-1 bg-blue-500 hover:bg-blue-700 text-white rounded-xl shadow-md text-base' 
         variant="destructive" 
         onClick={handleCancel}>
          <XCircle className='h-5 w-5 mr-2' />
          Cancel Sending
        </Button>
       )}
       </div>

       {isSending && (
        <div className='flex items-center gap-2 text-blue-500 animate pulse justify-center'>
          <Loader2 className='animate-spin h-5 w-5' />
          sending message in {delay} seconds...
        </div>
       )
       
       }

       {sentMessage && (
        <div className='bg-green-200 border border-green-300 rounded-xl p-4 mt-4 text-green-800 shadow-md text-sm sm:text-base'>
          <p className='font-semibold mb-1'>✅ Message Sent:</p>
          <p className='font-medium'>{sentMessage}</p>
        </div>
       )}
    </div>
  )
}

export default MessageForm