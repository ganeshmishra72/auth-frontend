'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import useAuth from '@/auth/store'
import toast from 'react-hot-toast'
import { getUserInfo } from '@/services/AuthServices'
import User from '@/modledata/User'

const Home = () => {
  const cardContent = [
    {
      name: 'Total Users',
      value: '1,245',
      icon: <i className="ri-team-line" />
    },
    {
      name: 'Active Sessions',
      value: '342',
      icon: <i className="ri-fingerprint-line" />
    },
    {
      name: 'Requests / Min',
      value: '8.2K',
      icon: <i className="ri-supabase-fill" />
    },
    {
      name: 'Auth Success Rate',
      value: '99.8%',
      icon: <i className="ri-line-chart-line" />
    }
  ]

  const userEmail=useAuth(s=>s.user)
  const [user,setUser]=useState<User |null>(null)
  const getUser=async()=>{
    try {
     const useremail= await getUserInfo(userEmail?.email)
      setUser(useremail)
      toast.success("user Found!!")
    } catch (error) {
      toast.error("User Not Found!!")
      console.log(error);
      
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-12 space-y-10">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Welcome back,  👋
          </p>
        </div>

        {/* CTA BUTTON */}
        <div>
        <Button onClick={()=>getUser()} className="rounded-2xl px-6 py-5 bg-purple-600 hover:bg-purple-700">
          Get User Info
        </Button>
        <p className='text-center mt-2'>{user?.name}</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardContent.map((item, key) => (
          <Card
            key={key}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl 
                       shadow-lg hover:shadow-purple-500/20 transition"
          >
            <CardContent className="flex items-center gap-5 py-8">
              <div className="text-4xl text-purple-400">
                {item.icon}
              </div>

              <div>
                <p className="text-sm text-gray-400">{item.name}</p>
                <h2 className="text-2xl font-bold text-white">
                  {item.value}
                </h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <Card className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Recent Activity
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-gray-300">
          <div className="flex items-center gap-3">
            <span className="text-green-400">●</span>
            User logged in using JWT authentication
          </div>
          <div className="flex items-center gap-3">
            <span className="text-blue-400">●</span>
            Refresh token rotated successfully
          </div>
          <div className="flex items-center gap-3">
            <span className="text-yellow-400">●</span>
            New device login detected
          </div>
          <div className="flex items-center gap-3">
            <span className="text-purple-400">●</span>
            Password updated securely
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
