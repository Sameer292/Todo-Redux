import { useState, useRef, useCallback, useMemo } from "react"
import { useDispatch } from "react-redux"
import { type AppDispatch, Section } from "../../redux/store"
import { onGoingTodoActions, doneTodoActions, yetToStartTodoActions } from "../../redux/exportActions.ts"
import SectionButtons from "./SectionButtons.tsx"

const TodoInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [todo, setTodo] = useState<string>("")
  const [section, setSection] = useState<Section | null>(null)

  const actionMap = useMemo(() => ({
    [Section.YetToStart]: yetToStartTodoActions.addTodo,
    [Section.OnGoing]: onGoingTodoActions.addTodo,
    [Section.Done]: doneTodoActions.addTodo,
  }), [])

  const handleClick = useCallback(() => {
    const trimmedTodo = todo.trim()
    if (trimmedTodo === "") return

    const action = actionMap[section!]
    if (action) {
      dispatch(action(trimmedTodo))
    }
    setTodo("");
    inputRef.current?.focus();
  }, [todo, section, dispatch, actionMap])

  const isButtonDisabled = useMemo(() => {
    return section === null || todo.trim() === ""
  }, [section, todo])


  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick()
    }
  }, [handleClick])

  const handleButtons = useCallback((mySection: Section): void => {
    setSection(mySection)
    inputRef.current?.focus()
  }, [])

  const sectionButtonProps = useMemo(() => [
    { mySection: Section.YetToStart, text: "Yet To Start Tasks" },
    { mySection: Section.OnGoing, text: "OnGoing Tasks" },
    { mySection: Section.Done, text: "Completed Tasks" }
  ], [])

  return (
    <div className="w-full">
      <h2 className="font-bold text-xl text-center text-wrap wrap-anywhere " >New Todo</h2>
      <div className="flex justify-evenly" >
        <input placeholder="Write your todo" value={todo} ref={inputRef} onKeyDown={handleKeyDown} onChange={handleChange} className=" border-2 border-[#32332f] w-[75%] lg:w-[80%] rounded-md h-9  pl-3 " type="text" />
        <button onClick={handleClick} disabled={isButtonDisabled} type="submit" value="Add" className="bg-[#36454f] text-white px-3 py-1 text-wrap wrap-anywhere transition duration-100 ease-in-out active:bg-[#32332f] active:scale-95 rounded-md w-[20%] ml-2"> Add </button>
      </div>
      <div className="flex justify-evenly mt-3 flex-wrap gap-3 ">
        {
          sectionButtonProps.map((props)=> <SectionButtons key={props.mySection} handleButtons={handleButtons} mySection={props.mySection} text={props.text} section={section} />)
        }
      </div>
    </div>
  )
}

export default TodoInput