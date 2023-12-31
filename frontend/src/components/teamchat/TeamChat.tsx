import { AuthContext } from "@/context/AuthContext";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export default function TeamChat() {
  const [messages, setMessages] = useState<string[]>([]); //["hi","hello"
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const { token, setToken } = useContext(AuthContext);
  useEffect(() => {
    const abortController = new AbortController();
    fetch("http://localhost:8000/chat/getMessage", {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            if (setToken) setToken(null);
          }
          throw new Error("HTTP Error " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMessages(data.value);
      });
    return () => {
      abortController.abort();
    };
  }, []);
  useEffect(() => {
    //scroll to bottom
    const chat = document.querySelector("#chat");
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  });
  return (
    <>
      <div
        id="chat"
        className="bg-slate-800 p-6 rounded-xl flex flex-col gap-3 h-[30rem] max-h-[30rem] overflow-y-scroll relative pb-14"
      >
        {messages.map((message) => (
          <RecievedMessage message={message} />
        ))}
        {sentMessages.map((message) => (
          <SentMessage message={message} />
        ))}
      </div>
      <ChatInput setSentMessages={setSentMessages} />
    </>
  );
}
function RecievedMessage({ message }: { message: string }) {
  return (
    <div className="rounded-t-xl rounded-r-xl bg-slate-700 p-3 max-w-2xl mr-8">
      {message}
    </div>
  );
}
function SentMessage({ message }: { message: string }) {
  return (
    <div className="rounded-t-xl rounded-l-xl bg-lime-900 p-3 max-w-2xl ml-8 w-full self-end">
      {message}
    </div>
  );
}

function ChatInput({
  setSentMessages,
}: {
  setSentMessages: Dispatch<SetStateAction<string[]>>;
}) {
  const [message, setMessage] = useState("");
  const { token, setToken } = useContext(AuthContext);
  const handleSend = () => {
    if (message.trim() === "") return;
    const payload = JSON.stringify({ message });
    fetch("http://localhost:8000/chat/postMessage", {
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            if (setToken) setToken(null);
          }
          throw new Error("HTTP Error " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setSentMessages((prev) => [...prev, message]);
        setMessage("");
      });
  };
  return (
    <div className="flex gap-3  w-full mt-6">
      <input
        type="text"
        className="bg-slate-700 rounded-xl p-3 w-full"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <button className="bg-lime-900 rounded-xl p-3" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
