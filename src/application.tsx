import React from "react";

import { useOpenGPT } from "hooks";
import { ChatResponse } from "types";

export function Application() {
  const { openGPT, success } = useOpenGPT();
  const [ content, setContent ] = React.useState<string>("");

  const ask = () => {
    openGPT.chat({ 
      prompt: "What's My Name?",
      successCB: (response: ChatResponse) => {
        setContent(response.message.content)
      }
    });
  }

  const askWithImage = () => {
    openGPT.chatWithImage({ 
      prompt: "tell me what is this image about?",
      imageUrl: "https://assets.puter.site/doge.jpeg",
      successCB: (response: ChatResponse) => {
        setContent(response.message.content)
      }
    });
  }

  return (
    <div>
      <h1>
        Jade
        {success ? "✅" : "❌"}
      </h1>
      <button onClick={ask}>
        Ask
      </button>
      <button onClick={askWithImage}> 
        Ask with image
      </button>
      <p>
        {content}
      </p>
    </div>
  )
}