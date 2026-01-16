'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import useAuth from '@/auth/store'
import { redirect } from 'next/navigation'

type LayoutPros={
  children:React.ReactNode
}

const Layout = ({children}:LayoutPros) => {

  const [sildBar,setSlidBar]=useState(false)

  const [isMenu,setMenu]=useState(true)
   const checkLogin=useAuth(state=>state.checkLogin);
   const userData=useAuth(state=>state.user)
   const logout=useAuth(s=>s.logout)
     
   
   const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
  <>
  {/* Laptop */}
  <div className='hidden md:block'>
    <nav className='bg-gray-900 p-4 shadow flex justify-around items-center text-white sticky top-0 left-0 z-10'>
      <div className='space-x-2 items-center flex '>
        <Link href={"/"} className='h-6 w-6 rounded-md inline-block text-center bg-gradient-to-r from-primary to-primary/40'>A</Link>
        <Link href={"/"} className='font-semibold'>Auth App</Link>
      </div>
      <div className='flex items-center gap-4'>
        {
          checkLogin() ?
          <>
          <Link href={"/dashboard/profile"}>{userData?.name}</Link>
        <Button onClick={()=>{logout(),redirect("/")}} size={"sm"} className='cursor-pointer bg-transparent  hover:bg-white hover:text-violet-950 transition-all' variant={"outline"}>Logout</Button>
        </>:

           <>
        <Link href={"/"}>Home</Link>
        <Link href={"/login"}  >
        <Button size={"sm"} className='cursor-pointer bg-transparent  hover:bg-white hover:text-violet-950 transition-all' variant={"outline"}>Login</Button>
        </Link>
        <Link href={"/singup"} className='text-black'>
        <Button  size={"sm"} className='cursor-pointer   hover:bg-transparent hover:text-white transition-all' variant={"outline"}>Sign Up</Button>
        </Link>
        </>
        }
      </div>
    </nav>
    <section>{children}</section>
   <footer className="border-t border-white/10 py-10 text-center text-gray-500 bg-gradient-to-br from-black flex flex-col  via-slate-900 to-black">
      © 2026 RDMISHRA AUTH. All rights reserved.
      </footer>
  </div>

  {/* Mobile */}
  <div className='md:hidden'>
    <nav className='bg-gray-900 p-4 shadow flex justify-between items-center text-white sticky top-0 left-0 z-10'>
      <div className='space-x-2 items-center flex text-xl'>
        <Link href={"/"} className='h-8 w-8 rounded-md inline-block text-center bg-gradient-to-r from-primary to-primary/40'>A</Link>
        <Link href={"/"} className='font-semibold'>Auth App</Link>
      </div>
      {
        isMenu&&
      <div>
        <Button onClick={()=>{setSlidBar(true),setMenu(false)}} className='text-xl'><i className="ri-menu-3-line"></i></Button>
      </div>
      }
      {
      sildBar &&
      <div className='w-[50%] h-screen bg-gray-900 fixed top-0 left-0'>
        <Button onClick={()=>{setSlidBar(false),setMenu(true)}} className='absolute top-5 right-5 bg-transparent'><i className="ri-close-large-line"></i></Button>
      <div className=' flex flex-col p-6 gap-4 text-lg mt-8 '>
        {
          checkLogin()?
          <>
          
        <Link href={"/dashboard/profile"} onClick={()=>{setSlidBar(false),setMenu(true)}}>{userData?.name}</Link>
        
        <Button onClick={()=>{logout(), redirect("/") ,setSlidBar(false)}} size={"sm"}  className='cursor-pointer bg-transparent  hover:bg-white hover:text-violet-950 transition-all' variant={"outline"}>Logout</Button>
       
          </>
          :
          <>
           <Link href={"/"} onClick={()=>{setSlidBar(false),setMenu(true)}}>Home</Link>
        <Link href={"/login"}onClick={()=>{setSlidBar(false),setMenu(true)}}>
        <Button size={"sm"}  className='cursor-pointer bg-transparent  hover:bg-white hover:text-violet-950 transition-all' variant={"outline"}>Login</Button>
        </Link>
        <Link href={"/singup"} className='text-black'onClick={()=>{setSlidBar(false),setMenu(true)}}>
        <Button  size={"sm"} className='cursor-pointer   hover:bg-transparent hover:text-white transition-all' variant={"outline"}>Sign Up</Button>
        </Link>
          </>

        }
      </div>
      </div>
      }
    </nav>
    <section>{children}</section>
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 bg-gradient-to-br from-black flex flex-col  via-slate-900 to-black">
      © 2026 RDMISHRA AUTH. All rights reserved.
      </footer>
  </div>
  </>
)
}


export default Layout
