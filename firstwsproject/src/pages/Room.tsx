import { useParams } from "react-router-dom";

export default function Room() {

    // Get roomId from URL
    const { roomId } = useParams();

    // Get userId from localStorage
    const userId = localStorage.getItem("userId");

    // STATE PLACEHOLDERS YOU WILL IMPLEMENT
    // const [messages, setMessages] = useState([])
    // const [input, setInput] = useState("")
    // const socket = useRef<WebSocket | null>(null)

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <div className="flex justify-between items-center border-b bg-white px-6 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Room:</span>
                    <span className="font-semibold text-blue-600">
                        {roomId}
                    </span>
                    <button
                        className="cursor-pointer text-xs border px-2 py-1 rounded hover:bg-gray-100"
                    >
                        Copy
                        {/* TODO: implement copy roomId functionality */}
                    </button>
                </div>

                {/* RIGHT - USER ID */}
                <div className="flex items-center gap-2">

                    <span className="text-sm text-gray-500">User:</span>

                    <span className="font-semibold text-green-600">
                        {userId}
                    </span>

                </div>

            </div>

            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">

                {/* 
          TODO: Map messages here
          
          Example structure:
          
          messages.map((msg) => (
            <MessageBubble />
          ))
        */}

                {/* SAMPLE MESSAGE LEFT */}
                <div className="flex justify-start">
                    <div className="bg-white border px-4 py-2 rounded-lg shadow-sm max-w-xs">
                        <p className="text-sm text-gray-700">
                            Hello from another user
                        </p>
                    </div>
                </div>

                {/* SAMPLE MESSAGE RIGHT */}
                <div className="flex justify-end">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm max-w-xs">
                        <p className="text-sm">
                            Hello from you
                        </p>
                    </div>
                </div>

            </div>

            {/* INPUT AREA */}
            <div className="border-t bg-white p-4">

                <div className="flex gap-3">

                    {/* MESSAGE INPUT */}
                    <input
                        placeholder="Type your message..."
                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"

                    // TODO
                    // value={input}
                    // onChange={(e)=>setInput(e.target.value)}

                    />

                    {/* SEND BUTTON */}
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Send
                        {/* TODO: trigger send message function */}
                    </button>

                </div>

            </div>

        </div>
    );
}