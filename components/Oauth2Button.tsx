import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Oauth2Button = () => {

  const googleLogin=()=>{
    window.location.href=`${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/google`
  }
  const githubLogin=()=>{
    window.location.href=`${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/github`
  }

  return (
     <div className='flex flex-col gap-4 '>
           
            <Button onClick={googleLogin} type='button' className=' text-white bg-gray-500 cursor-pointer w-full'><i className="ri-google-fill mr-2"></i>Google</Button>
            
            
            <Button onClick={githubLogin} type='button' className=' text-white bg-gray-600 cursor-pointer w-full'><i className="ri-github-fill mr-2"></i>Github</Button>
           
          </div>
  )
}

export default Oauth2Button
