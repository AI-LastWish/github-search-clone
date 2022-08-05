import React from 'react'
import { useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slices/counterSlice'

const ChangeValue = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment State</button>
      <button onClick={() => dispatch(decrement())}>Decrement State</button>
    </div>
  )
}

export default ChangeValue