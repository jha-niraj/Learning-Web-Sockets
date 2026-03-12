import './App.css'
import { useEffect, useState } from 'react'

interface MessageProp {
	type: 'user' | 'server';
	content: string;
}

function App() {
	const [input, setInput] = useState('')
	const [messages, setMessages] = useState<MessageProp[]>([])
	const [socket, setSocket] = useState<WebSocket | null>(null)

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080");
		setSocket(ws);

		ws.onmessage = (event) => {
			setMessages((prevMessages) => [...prevMessages, { type: 'server', content: event.data }]);
		}
	}, [])

	const handleSendMessage = () => {
		if (socket) {
			socket.send(input);
			setMessages((prevMessages) => [...prevMessages, { type: 'user', content: input }]);
			setInput('');
		}
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			<div>
				<h1 className='font-bold text-2xl'>
					Niraj Jha - Chat Server
				</h1>
				<p className='text-sm text-gray-500'>
					A simple WebSocket-based chat server
				</p>
			</div>
			<div className='w-full max-w-md h-[90vh] mt-4 flex flex-col'>
				<div className='border p-2 rounded-l w-full h-full overflow-y-auto'>
					{
						messages.map((msg, index) => (
							<div key={index} className='p-2 border-b last:border-b-0'>
								{
									msg.type === 'user' ? (
										<div className='text-right'>
											<span className='font-bold'>You:</span> {msg.content}
										</div>
									) : (
										<div className='text-left'>
											<span className='font-bold'>Server:</span> {msg.content}
										</div>
									)
								}
							</div>
						))
					}
				</div>
				<div className='bottom flex pt-4'>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className='border p-2 rounded mb-4 w-full'
					/>
					<button
						onClick={handleSendMessage}
						className='border rounded-r bg-black text-white w-fit'
					>
						Send Message
					</button>
				</div>
			</div>
		</div>
	)
}

export default App