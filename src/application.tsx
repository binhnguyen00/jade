import React from "react";

import { useOpenGPT } from "hooks";

export function Application() {
  const { openGPT, success } = useOpenGPT();

  const ask = () => {
    openGPT.chat({ prompt: "Hello" });
  }

  const askWithImage = () => {
    openGPT.chatWithImage({ prompt: "what do you see?", imageUrl: "https://assets.puter.site/doge.jpeg" });
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
    </div>
  )
}