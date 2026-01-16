'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import LoginData from '@/modledata/LoginData'
import toast from 'react-hot-toast'
import { loginUser } from '@/services/AuthServices'
import { useRouter } from 'next/navigation'
import { Alert, AlertTitle } from './ui/alert'
import { CheckCircle2Icon } from 'lucide-react'
import { Spinner } from './ui/spinner'
import useAuth from '@/auth/store'
import Oauth2Button from './Oauth2Button'

const Login = () => {

  const navigate=useRouter()
  const login=useAuth(state=>state.login)
  const [fromData,setFromData]=useState<LoginData>({
      email:"",
      password:""
  })

  const [loding,setLoding]=useState<boolean>(false)
  const [error,setError]=useState<any>(null)
  const handelFromValue=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value
        const key=e.target.name
        setFromData({
          ...fromData,
          [key]:value
        })
  }

  const handelLoginFrom=async(e:React.FormEvent)=>{
    e.preventDefault()
       if(fromData.email.trim()==="")
          {     toast.error("Email is required")
            return;
          }
            if (!fromData.password || fromData.password.trim() === "") {
            toast.error("Password is required");
            return;
          }
        
     try {
       
       setLoding(true)
      await login(fromData)
        // const data=await loginUser(fromData);
        // console.log(data);
        toast.success("Succesfully User Login")
        setFromData({
          email:"",
          password:""
        })
         navigate.push("/")
       
     } catch (error) {
      
       setError(error)
       toast.error("Error In Login User!!")
       
     }
     finally{
      setLoding(false)
     }


             
  }


  return (
    <div className='min-h-screen bg-slate-900 flex justify-center items-center px-8 '>
         <Card className='bg-transparent border border-slate-100  text-white flex  flex-col w-full max-w-sm animate__animated animate__fadeIn'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl font-semibold'>Welcome Back</CardTitle>
            <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
          {
               error &&
          <Alert className='mt-5 bg-transparent' variant={"destructive"}>
            <CheckCircle2Icon />
              <AlertTitle>{
                 error?.response ? error?.response?.data?.message :error?.message
                }</AlertTitle>
          </Alert>
          }
          </CardHeader>
          <CardContent className='mt-8'>
            <form className='flex flex-col gap-6' onSubmit={handelLoginFrom}>
              
              <div className='flex gap-2 flex-col'>
                 <Label>Email</Label>
                 <Input onChange={handelFromValue} value={fromData.email.trim()} name='email' placeholder='guru@gamil.com'  ></Input>
              </div>
              <div className='flex gap-2 flex-col'>
                 <Label>Password</Label>
                 <Input onChange={handelFromValue} value={fromData.password.trim()} name='password' placeholder='******' ></Input>
              </div>
               
            <Button  className='bg-white text-black hover:text-white cursor-pointer'>
              {
                loding ? <><Spinner/> Please Wait...</>  :"Login"
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

export default Login
