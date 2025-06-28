"use client"
import TodoInput from "./todo/TodoInput.tsx";
import { Provider } from "react-redux";
import { store, type user } from "../redux/store.ts";
import DoneTodoList from "./todo/DoneTodoList.tsx";
import OnGoingTodoList from "./todo/OnGoingTodoList.tsx";
import YetToStartTodoList from "./todo/YetToStartTodoList.tsx";
import TodoCount from "./todo/TodoCount.tsx";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ProfileDialog } from "./profile/ProfileDialog.tsx";
import { ListSkeleton } from "./todo/Skeleton.tsx";
export default function Home() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<user | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push('/signIn')
    }
    setCurrentUser(JSON.parse(currentUser || "null"));
    setLoading(false);
  }, [router])


  return (
    <Provider store={store}>
      <div className="flex flex-col items-center  min-h-screen bg-[#f6f4f0]" >
        <div className="w-full h-40 bg-[#7c7e73] flex justify-between items-start pt-3 px-6 " >
          <TodoCount />
          <ProfileDialog user={currentUser} />
        </div>
        <div className=" lg:w-[40%] w-[calc(100%-3rem)] h-auto shadow-lg rounded-lg p-3 -mt-17 bg-[#f6f4f0] ">
          <TodoInput />
        </div>
        <div className="mt-8 justify-center   py-3 flex flex-wrap gap-5 w-[calc(100%-3rem)]  ">
          <div className="max-sm:w-full ">
            { loading ? <ListSkeleton color="bg-red-700" />  : <YetToStartTodoList />}
          </div>
          <div className="max-sm:w-full ">
            { loading? <ListSkeleton color="bg-blue-700" /> :<OnGoingTodoList />}
          </div>
          <div className="max-sm:w-full ">
            { loading? <ListSkeleton color="bg-green-700"/> :<DoneTodoList />}
          </div>
        </div>
      </div >
    </Provider>
  );
}
