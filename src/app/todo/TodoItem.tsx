import React, { useState, useRef } from "react";
import { type Itodo, type AppDispatch, Section as EnumSection } from "../../redux/store";
import { useDispatch } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";

interface Props extends Itodo {
  actions: {
    removeTodo: (id: string) => UnknownAction,
    editTodo: (id: string, todo: string) => UnknownAction
  },
  changeAction?: {
    addTodo: (todo: string) => UnknownAction
  },
  Section: EnumSection
}

const TodoItem = ({ todo, id, actions, changeAction, Section }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [IsTodoEditing, setIsTodoEditing] = useState<boolean>(false);
  const [todoMsg, setTodoMsg] = useState<string>(todo);
  const inputRef = useRef<HTMLInputElement>(null)

  const updateTodo = () => {
    dispatch(actions.editTodo(id, todoMsg))
    setIsTodoEditing((prev) => !prev);
  }
  const deleteTodo = () => {
    dispatch(actions.removeTodo(id))

  }
  const handleChangeAction = () => {
    if (changeAction) {
      dispatch(actions.removeTodo(id))
      dispatch(changeAction.addTodo(todoMsg))
    }
  }

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTodo()
    }
  }

  return (
    <div className="flex  border-b-2 border-b-gray-300  px-3 py-1.5 gap-x-3">
      {Section === EnumSection.YetToStart ? <button onClick={handleChangeAction} className="bg-blue-700 text-white rounded-md px-1" >Start</button> : Section === EnumSection.OnGoing && <button onClick={handleChangeAction} className="bg-green-700 text-white rounded-md px-1" >Done</button>
      }
      <input
        type="text"
        className={`border-2 text-black outline-none w-full rounded-lg truncate ${IsTodoEditing ? "border-gray-400 px-2" : "border-transparent"
          } `}
        value={todoMsg}
        ref={inputRef}
        onKeyDown={handleInput}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!IsTodoEditing}
      />
      <button
        className="w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (IsTodoEditing) {
            updateTodo();
          } else {
            setIsTodoEditing(true);
            inputRef.current?.focus();
          }
        }}
      >
        {IsTodoEditing ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo()}
      >
        🗑
      </button>
    </div>
  );
};

export default React.memo(TodoItem);