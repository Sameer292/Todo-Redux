import { useState, useRef } from "react"
import { addTodo } from "../../redux/slice"
import { useDispatch } from "react-redux"
import { type AppDispatch } from "../../redux/store"

const TodoInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [todo, setTodo] = useState("")

  const handleClick = () => {
    if (todo === "") return
    dispatch(addTodo(todo))
    setTodo("");
    inputRef.current?.focus();
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todo != "") {
      handleClick()
    }
  }
  return (
    <div className="w-full" >
      <h2 className="font-bold" >New Todo:</h2>
      <input placeholder="Write your todo" value={todo} ref={inputRef} onKeyDown={handleKeyDown} onChange={handleChange} className="border-2 w-[75%] lg:w-[80%] rounded-md h-9 border-gray-300 pl-3 " type="text" />
      <button onClick={handleClick} type="submit" value="Add" className="bg-[#7c7e73] text-white px-3 py-1 rounded-md w-[4rem] ml-2"> Add </button>
    </div>
  )
}

export default TodoInput
