import { useLayoutEffect, useRef } from "react"

export const useFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus()
  })

  return inputRef
}
