import React from "react";

export function useScriptTag(src: string) {
  const [ success, setSuccess ] = React.useState(false);
  const [ error, setError ] = React.useState(false);

  React.useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = () => setSuccess(true)
      script.onerror = () => setError(true)
      document.body.appendChild(script)
    } else if (script.hasAttribute('data-loaded')) {
      setSuccess(true)
    } else {
      script.addEventListener('load', () => setSuccess(true))
      script.addEventListener('error', () => setError(true))
    }

    return () => {
    }
  }, [ src ])

  return { success, error };
}