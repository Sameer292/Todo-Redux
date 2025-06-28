"use client"
import React, { useEffect } from 'react'
import { RiUserAddFill } from 'react-icons/ri'
import Link from 'next/link'
import { useForm, SubmitHandler} from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { type user } from '@/redux/store'

const Page = () => {

    const router = useRouter()
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (currentUser) {
            router.push('/')
        }
    }, [router])


    const { register, handleSubmit, formState: { errors }    } = useForm<user>()


    const handleSubmitForm: SubmitHandler<user> = (user) => {
        localStorage.removeItem("currentUser");
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const userExists = existingUsers.find((u: user) => u.email === user.email && u.password === user.password);
        if (userExists) {
            localStorage.setItem("currentUser", JSON.stringify(userExists));
            router.push('/')
        }else{
            alert("USER NOT FOUND!!")
        }
    }

    return (
        <form autoComplete='off' name='random-form-name' onSubmit={handleSubmit(handleSubmitForm)} className='bg-[#77BFA3]  h-screen flex justify-center items-center ' >
            <div className='  bg-[#EDEEC9] text-black p-3 hide-scrollbar overflow-y-scroll text-sm rounded-md shadow-2xl  max-sm:h-[60%] sm:h-[60%] md:h-[35rem] xl:h-[75%] max-[400px]:h-[80%]  w-[85%] sm:w-[70%] lg:w-[50%]  '>
                <div className='flex flex-col justify-center items-center p-3' >
                    <div className='w-15 h-15 text-2xl mb-3 rounded-full text-[#EDEEC9] flex justify-center items-center bg-[#77BFA3] border shadow-lg border-gray-500 ' >
                        <RiUserAddFill />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-black text-xl font-bold mt-2'>
                            Sign In to your account
                        </span>
                        <span className='text-gray-500 text-xs text-center '>
                            A fantatstic todo app
                        </span>
                    </div>
                </div>
                <div className='flex flex-col gap-4 pb-4 border-b-1 border-gray-400 ' >
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='font-semibold text-gray-600'> Email Address </label>
                        <input type="text"  {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" } })} className={` border ${errors.email ? "border-red-500 border-2" : ""}  border-gray-500 focus:border-[#77bfa3] p-2 outline-0 rounded-md`} placeholder='Enter your email' />
                        {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='font-semibold text-gray-600'> Password </label>
                        <input type="password"  {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} className={` ${errors.password ? "border-red-500 border-2" : ""} border outline-0 focus:border-[#77bfa3]  border-gray-500 p-2 rounded-md`} placeholder='Create a password' />
                        {errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
                    </div>

                    <div className='flex justify-center h-10'>
                        <button type='submit' className='w-[85%] bg-[#77bfa3] outline-0 text-[#edeec9] rounded-lg font-bold shadow-xl text-xl ' >Sign In</button>
                    </div>
                </div>
                <div className='flex justify-center mt-2'>
                    <span className='text-gray-600'>
                        Don&apos;t have an account?
                        <Link href="/signUp" className='text-[#77BFA3] font-bold' > Sign Up</Link>
                    </span>

                </div>
            </div>
        </form>
    )
}

export default Page
