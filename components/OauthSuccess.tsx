'use client'
import useAuth from '@/auth/store'
import { refreshToken } from '@/services/AuthServices';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Spinner } from './ui/spinner';
import { useRouter } from 'next/navigation';
 

const OauthSuccess = () => {
  const navigate=useRouter()
  const [isRefresh,setRefresh]=useState<boolean>(false)
  const changeLoginData=useAuth(state=>state.changeLocalLogin);

  useEffect(()=>{
    const getAccesstoen=async()=>{
      if(!isRefresh){
        // call refresh token api

       try {
        
         setRefresh(true)

       const responseData= await refreshToken()
      //  login
       changeLoginData(responseData.accessToken,responseData.user,true,false);

       toast.success("Login Success!!")
       navigate.push("/dashboard/home")
       
       } catch (error) {
        console.log(error);
        toast.error("Login Failed")

       }
       finally{
        setRefresh(false)
       }
      }
    }

    getAccesstoen()
  },[])
  return (
    <div className='flex justify-center items-center p-16 min-h-screen bg-gradient-to-br from-black flex flex-col  via-slate-900 to-black text-white'>
      {
        isRefresh &&
        <>
      <Spinner />
      <h1 className="text-2xl font-semibold">Please Wait..</h1>
        </>
      }

    </div>
  )
}

export default OauthSuccess
