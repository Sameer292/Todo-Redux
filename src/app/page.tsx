"use client"
import TodoInput from "./todo/TodoInput";
import { Provider } from "react-redux";
import { store } from "../redux/store.ts";
import DoneTodoList from "./todo/DoneTodoList.tsx";
import OnGoingTodoList from "./todo/OnGoingTodoList.tsx";
import YetToStartTodoList from "./todo/YetToStartTodoList.tsx";
import TodoCount from "./todo/TodoCount.tsx";
export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center  min-h-screen bg-[#f6f4f0]" >
        <div className="w-full h-40 bg-[#7c7e73] flex flex-col items-end pt-3 pr-36 " >
          <TodoCount />
        </div>
        <div className=" lg:w-[40%] w-[calc(100%-3rem)] h-auto shadow-lg rounded-lg p-3 -mt-17 bg-[#f6f4f0] ">
          <TodoInput />
        </div>
        <div className="mt-8 justify-center   py-3 flex flex-wrap gap-5 w-[calc(100%-3rem)]  ">
          <div className="max-sm:w-full ">
            <YetToStartTodoList />
          </div>
          <div className="max-sm:w-full ">
            <OnGoingTodoList />
          </div>
          <div className="max-sm:w-full ">
            <DoneTodoList />
          </div>
        </div>
      </div >
    </Provider>
  );
}
