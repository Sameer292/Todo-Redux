"use client"
import React, { useEffect } from 'react'
import { RiUserAddFill } from 'react-icons/ri'
import Link from 'next/link'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { type user } from '@/redux/store'


const page = () => {

    const router = useRouter()
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (currentUser) {
            router.push('/')
        }
    }, [])


    const { register, handleSubmit, formState: { errors }, control } = useForm<user>()


    const handleSubmitForm: SubmitHandler<user> = (user) => {
        user.id = uuidv4();
        console.log(user);
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const userExists = existingUsers.find((u: user) => u.email.toLowerCase() === user.email.toLowerCase());
        if (userExists) {
            alert("User with this email already exists");
            return;
        }
        const updatedUsers = [...existingUsers, user];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(user));
        router.push('/')
    }

    return (
        <form autoComplete='off' name='random-form-name' onSubmit={handleSubmit(handleSubmitForm)} className='bg-[#77BFA3]  h-screen flex justify-center items-center ' >
            <div className='  bg-[#EDEEC9] text-black p-3 hide-scrollbar overflow-y-scroll text-sm rounded-md shadow-2xl  max-[380px]:h-[90%] h-[70%] sm:h-[60%] md:h-[35rem] xl:h-[85%]  w-[85%] sm:w-[70%]  xl:w-[50%] '>
                <div className='flex flex-col justify-center items-center p-3' >
                    <div className='w-15 h-15 text-2xl mb-3 rounded-full text-[#EDEEC9] flex justify-center items-center bg-[#77BFA3] border shadow-lg border-gray-500 ' >
                        <RiUserAddFill />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-black text-xl font-bold mt-2'>
                            Create Account
                        </span>
                        <span className='text-gray-500 text-xs text-center'>
                            A fantatstic todo app
                        </span>
                    </div>
                </div>
                <div className='flex flex-col gap-4 pb-4 border-b-1 border-gray-400 ' >
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='font-semibold text-gray-600'> Full Name </label>
                        <input aria-invalid={errors.name ? "true" : "false"} type="text"  {...register("name", { required: "Name is required" })} autoComplete='off' className={`outline-0 ${errors.name ? "border-red-500 border-2" : ""}   focus:border-[#77bfa3] border border-gray-500 p-2 rounded-md`} placeholder='Enter your full name' />
                        {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
                    </div>
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
                    <div className='flex gap-3'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="gender" className='font-semibold  text-gray-600'> Gender </label>
                            <Controller name="gender"
                                control={control}
                                rules={{ required: "Gender is required" }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`border w-full p-2 rounded-md ${errors.gender ? 'border-red-500' : 'border-black'} outline-0 focus:border-[#77bfa3]`}>
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.gender?.message && <span className='text-red-500 text-xs'>{errors.gender.message}</span>}
                        </div>
                        <div className='flex flex-col w-1/2' >
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" {...register("dob", { required: "Date of birth is required" })} className={` ${errors.dob ? "border-red-500 border-2" : ""} border border-black focus:border-[#77bfa3] outline-0 p-2 rounded-md `} />
                            {errors.dob && <span className='text-red-500 text-xs'>{errors.dob.message}</span>}
                        </div>
                    </div>
                    <div className='flex justify-center h-10'>
                        <button type='submit' className='w-[85%] bg-[#77bfa3] outline-0 text-[#edeec9] rounded-lg font-bold shadow-xl text-xl ' >Create Account</button>
                    </div>
                </div>
                <div className='flex justify-center mt-2'>
                    <span className='text-gray-600'>
                        Already have an account?
                        <Link href="/signIn" className='text-[#77BFA3] font-bold' > Sign In</Link>
                    </span>

                </div>
            </div>
        </form>
    )
}

export default page
