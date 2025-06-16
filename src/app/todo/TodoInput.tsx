import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { type AppDispatch, Section } from "../../redux/store"
import { onGoingTodoActions, doneTodoActions, yetToStartTodoActions } from "../../redux/exportActions.ts"

const TodoInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [todo, setTodo] = useState<string>("")
  const [section, setSection] = useState<Section | null>(null)
  const doneRef = useRef<HTMLButtonElement>(null)
  const onGoingRef = useRef<HTMLButtonElement>(null)
  const yetToStartRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (todo === "" || section === null) return
    if (section === Section.YetToStart) {
      dispatch(yetToStartTodoActions.addTodo(todo))
    }
    if (section === Section.OnGoing) {
      dispatch(onGoingTodoActions.addTodo(todo))
    }
    if (section === Section.Done) {
      dispatch(doneTodoActions.addTodo(todo))
    }
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


  const handleButtons = (section: Section, ref: React.RefObject<HTMLButtonElement | null>): void => {
    setSection(section)
    doneRef.current?.classList.remove("bg-[#32332f]")
    doneRef.current?.classList.add("bg-[#7c7e73]")
    onGoingRef.current?.classList.remove("bg-[#32332f]")
    onGoingRef.current?.classList.add("bg-[#7c7e73]")
    yetToStartRef.current?.classList.remove("bg-[#32332f]")
    yetToStartRef.current?.classList.add("bg-[#7c7e73]")
    ref.current?.classList.add("bg-[#32332f]")
    ref.current?.classList.remove("bg-[#7c7e73]")
    inputRef.current?.focus()
  }

  return (
    <div className="w-full">
      <h2 className="font-bold text-xl text-center text-wrap wrap-anywhere " >New Todo</h2>
      <div className="flex justify-evenly" >
        <input placeholder="Write your todo" value={todo} ref={inputRef} onKeyDown={handleKeyDown} onChange={handleChange} className=" border-2 border-[#32332f] w-[75%] lg:w-[80%] rounded-md h-9  pl-3 " type="text" />
        <button onClick={handleClick} type="submit" value="Add" className="bg-[#36454f] text-white px-3 py-1 text-wrap wrap-anywhere transition duration-100 ease-in-out active:bg-[#32332f] active:scale-95 rounded-md w-[20%] ml-2"> Add </button>
      </div>
      <div className="flex justify-evenly mt-3 flex-wrap gap-3 ">
        <button ref={yetToStartRef} onClick={() => handleButtons(Section.YetToStart, yetToStartRef)} className=" bg-[#7c7e73] text-wrap wrap-anywhere sm:p-2 py-2 px-1 text-sm transition duration-150 ease-linear active:scale-95 rounded-md text-white">
          Yet To Start Tasks
        </button>
        <button ref={onGoingRef} onClick={() => handleButtons(Section.OnGoing, onGoingRef)} className="bg-[#7c7e73] text-wrap wrap-anywhere sm:p-2 py-2 px-1 text-sm transition duration-150 ease-linear active:scale-95 rounded-md text-white">
          OnGoing Tasks
        </button>
        <button ref={doneRef} onClick={() => handleButtons(Section.Done, doneRef)} className=" bg-[#7c7e73] text-wrap wrap-anywhere sm:p-2 py-2 px-1 text-sm transition duration-150 ease-linear active:scale-95 rounded-md text-white">
          Completed Tasks
        </button>
      </div>
    </div>
  )
}

export default TodoInput
