'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import type RegisterData from '@/modledata/RegisterData'
import { registerUser } from '@/services/AuthServices'
import { useRouter } from 'next/navigation'
import { Spinner } from './ui/spinner'
import Oauth2Button from './Oauth2Button'


const Singup = () => {

  const navigate=useRouter()
  const [fromData,setFromData]=useState<RegisterData>({
    name:"",
    email:"",
    password:"",
  })

  const [loding,setLoding]=useState<boolean>(false)
  const [error,setError]=useState(null)

  const handelFromValue=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const value=e.target.value
      const key=e.target.name
      setFromData({
        ...fromData,
        [key]:value
      })
  }

  const handelOnSubmit= async(e:React.FormEvent)=>{
          e.preventDefault()
          console.log(fromData);
          
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
          const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

          if(fromData.name.trim()==="")
          {     toast.error("Name is required")
                return;
          }
          
          
          if(fromData.email.trim()==="")
          {     toast.error("Email is required")
            return;
          }

          if(!emailRegex.test(fromData.email.trim())){
            toast.error("Enter a valid email address")
            return;
          }
           if (!fromData.password || fromData.password.trim() === "") {
            toast.error("Password is required");
            return;
          }
           if (!passwordRegex.test(fromData.password.trim())) {
            toast.error(
              "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
            );
            return;
                  }
          
                  try {
                    setLoding(true)
                    const result=await registerUser(fromData);
                
                    
                    toast.success("user register successfully!!")
                    setFromData({
                      name:"",
                      email:"",
                      password:""
                    })
                    navigate.push("/login")
                    
                  } catch (error) {
                    console.log(error);
                    toast.error("Error in registering the user");
                  }
                  finally{
                    setLoding(false)
                  }
          
  }

  return (
    <div className='min-h-screen bg-slate-900 flex justify-center items-center px-8 '>
         <Card className='bg-transparent border border-slate-100  text-white flex  flex-col w-full max-w-sm animate__animated animate__fadeIn'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl font-semibold'>Create Your Account</CardTitle>
            <CardDescription>
          Join The next Gen G Auth System
        </CardDescription>
          </CardHeader>
          <CardContent className='mt-8'>
            <form className='flex flex-col gap-6' onSubmit={handelOnSubmit}>
              <div className='flex gap-2 flex-col'>
                 <Label>Name</Label>
                 <Input name='name' onChange={handelFromValue} placeholder='guru' value={fromData.name.trim()}></Input>
              </div>
              <div className='flex gap-2 flex-col'>
                 <Label>Email</Label>
                 <Input name='email' onChange={handelFromValue} placeholder='guru@gamil.com' value={fromData.email.trim()} ></Input>
              </div>
              <div className='flex gap-2 flex-col'>
                 <Label>Password</Label>
                 <Input name='password' onChange={handelFromValue} placeholder='******' value={fromData.password.trim()}></Input>
              </div>
                <Button disabled={loding} className='bg-white text-black hover:text-white cursor-pointer'>
              {
                loding ? <><Spinner/> Please Wait...</>  :"Sing Up"
              }
              </Button>
          <hr />
          {
            <Oauth2Button/>
          }
            </form>
          </CardContent>
          
         </Card>
    </div>
  )
}

export default Singup
