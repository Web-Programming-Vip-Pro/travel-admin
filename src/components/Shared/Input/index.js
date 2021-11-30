import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'

const Input = ({ debounce = 0, onValueChange, ...props }) => {
  const [value, setValue] = useState(props?.value || '')
  const [debouncedValue, setDebouncedValue] = useState('')
  useDebounce(
    () => {
      setDebouncedValue(value)
    },
    debounce,
    [value]
  )
  useEffect(() => {
    if (onValueChange) {
      onValueChange(value)
    }
  }, [debouncedValue])
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default Input
