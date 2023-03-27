import './App.css';
import './normal.css';
import { useState } from 'react';

function App() {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you today?"
  },{
    user: "me",
    message: "I want to use ChatGPT today"
  }]);

  async function handleSubmit(e){
    e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: `${input}`}])
    setInput("");

    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          message: chatLog.map((message) => 
          message.message).join("")
        })
      });
    const data = await response.json();
    setChatLog([...chatLog, {user: "gpt", message: `${data.message}`}])
    console.log(data.message);
  }

  return (
    <div className="App">
    <aside className="sidemenu">
      <div className='side-menu-button'>
        <span>+</span>
        New Chat
      </div>
    </aside>
    <section className="chatbox">
    <div className='chat-log'>
      {chatLog.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>


    

    
      <div className="chat-input-holder">
      <form onSubmit={handleSubmit}>
        <input rows="1"  value={input} onChange={(e)=> setInput(e.target.value)} className='chat-input-textarea'>
        </input>
      </form>
      </div>
    </section>
    
    </div>
  );
}

const ChatMessage = ( {message} ) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}> 
      <div className='chat-message-center'>
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="-25 0 400 355">
            <path d="M141.3 1.4c-31.1 6-56.8 26.7-67.5 54.5-2.1 5.7-2.6 6.2-6.3 7.1C31.7 72.1 5.9 101.9.8 140c-2.8 21 4 45.6 17.6 63.7l4.7 6.2-1.6 5.8c-2.6 9.4-3.1 28.3-1.1 38.3 3.9 19.1 11.5 33.2 25.5 47 10.8 10.7 20 16.5 33.4 21.1 13.6 4.6 29.2 6.1 42.2 4 4.9-.9 5.1-.8 9.5 3.3 11.8 10.9 25.7 18.7 40.5 22.7 10.5 2.9 31.6 3.2 41.9.6 28.7-7.2 52-26.7 62.5-52.5l2.7-6.7 8.1-2.6c30.3-9.9 52.9-33.9 60.5-64.4 3-12.3 3-31.4-.1-43-2.7-10.1-9.5-24.2-15.5-32.2l-4.7-6.2 1.6-5.8c2.3-8.2 3.1-26.6 1.5-36-4.8-30-25.9-56.8-53.9-68.4-14.2-5.9-33.4-8.3-47.6-6-4.9.9-5.1.8-9.5-3.3-11.8-11-25.9-18.9-40.5-22.6C168.2.3 151-.4 141.3 1.4zm28.5 23.2c8 1.6 21.6 7.6 26.6 11.7l2.9 2.3-37.7 21.8c-20.7 12-38.3 22.7-39.1 23.9-1.3 1.8-1.5 9.6-1.5 53.9 0 28.5-.3 51.8-.7 51.8-.5 0-7.3-3.8-15.3-8.4l-14.5-8.4-.3-45.3c-.3-51.3 0-54.1 6.8-67.7 6.9-13.7 17-23.7 30.5-30.2 13.7-6.7 27.6-8.4 42.3-5.4zm93.3 30.1c19.9 6.9 34.6 21.5 41.6 41.5 2.1 5.8 2.7 9.8 3.1 19.1.2 6.5.1 12.2-.4 12.6-.5.5-17.3-8.7-37.4-20.4-20.1-11.6-37.8-21.5-39.3-21.9-1.6-.4-4-.1-5.9.7-1.8.8-22.1 12.3-45 25.5-23 13.3-42.2 24.2-42.8 24.2-.6 0-1-6-1-17v-17l3.8-2.4c5.8-3.8 67.1-39 73.1-42 14.6-7.5 34-8.6 50.2-2.9zM68.7 177.6c.7 1.1 21.3 13.7 45.8 27.9l44.6 25.7-2.8 1.7c-1.5.9-8.5 5-15.4 8.9l-12.5 7.2-37.5-21.6C50 203.8 48.8 203 41.4 195.3c-21-21.9-24-56.3-7.2-82.1 5.5-8.5 16-18 25-22.6l7.3-3.8.5 44.4c.4 31.8.8 44.9 1.7 46.4zm190.4-50c20.6 11.9 39.8 23.4 42.7 25.6 11.3 8.7 20.8 24.6 23.8 39.8 3 15 .4 30.9-7.3 45-5.2 9.4-17.8 21.6-27.3 26.4l-7.5 3.7-.5-44.3c-.4-32.1-.8-44.9-1.7-46.4-.7-1.2-20.8-13.4-45.2-27.5-24.3-14-44.1-25.7-44.1-26.1 0-.5 28.6-17.7 29.6-17.8.1 0 17 9.7 37.5 21.6zm-64.5 16.6 19.4 11.2v44.1l-19.5 11.3-19.4 11.3-17.8-10.2c-9.8-5.6-18.6-10.9-19.5-11.7-1.6-1.4-1.8-3.8-1.8-22.7 0-18 .2-21.5 1.6-22.5 1.3-1.2 36.4-21.8 37.2-22 .2 0 9.1 5 19.8 11.2zm50.4 29.2 14.5 8.4.3 45.3c.3 51.4 0 54.1-6.8 67.7-13.9 27.5-43.4 41.9-73.2 35.7-7.6-1.6-21.3-7.7-26.2-11.8l-2.9-2.3 36.4-21c20-11.5 37.6-22.1 39.2-23.6l2.7-2.6v-52.1c0-28.7.3-52.1.8-52.1.4 0 7.2 3.8 15.2 8.4zm-31 62.5v17l-2.7 1.9c-5 3.5-69.2 40.2-75.5 43.2-9.5 4.5-19.3 6.3-30.7 5.7-27.9-1.4-51.2-19.1-60.1-45.7-2.4-6.9-4.1-29.4-2.4-30.9.5-.5 17.6 8.8 37.9 20.6 28.3 16.5 37.8 21.6 40.6 21.6 3.7.2 9.2-2.8 67.4-36.7 12.7-7.4 23.6-13.5 24.3-13.5.9-.1 1.2 3.9 1.2 16.8z" />
          </svg>
        </div>
        <div className='Message'>
          {message.message}
        </div>
      </div>
    </div>
  )
}

export default App;
