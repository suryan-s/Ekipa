import { useEffect, useState } from "react";

export default function TeamChat() {
  useEffect(() => {
    const abortController = new AbortController();
    fetch("http://localhost:8000/chat/getMessage", {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className="bg-slate-800 p-6 rounded-xl flex flex-col gap-3">
      <RecievedMessage message="hi" />
      <SentMessage message="hey" />

      <ChatInput />
    </div>
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

function ChatInput() {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    fetch("http://localhost:8000/chat/postMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        body: JSON.stringify({ message }),
      },
    });
  };
  return (
    <div className="flex gap-3">
      <input
        type="text"
        className="bg-slate-700 rounded-xl p-3 w-full"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="bg-lime-900 rounded-xl p-3" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
