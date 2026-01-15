import React from 'react'
import { Button } from './ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { title } from 'process'

const Home = () => {

  const cardData = [
    {
      icon: <i className="ri-shield-star-line"></i>,
      title: "JWT, OAuth2, Refresh Tokens & role‑based access control."
      , color: "text-blue-400"
    },
    {
      icon: <i className="ri-flashlight-line"></i>,
      title: "Optimized APIs with minimal latency and high scalability."
      , color: "text-violet-400"
    },
    {
      icon: <i className="ri-git-repository-private-line"></i>,
      title: "End‑to‑end encryption and secure cookie‑based sessions"
      , color: "text-pink-400"
    },
    {
      icon: <i className="ri-user-settings-line"></i>,
      title: "Plug‑and‑play auth for Next.js, React & backend services."
      , color: "text-green-400"
    },

  ]
  const cardData2 = [
    {
      number: "01",
      title: "Register",
      discprection: "Create account with secure validation."

    },

    {
      number: "02",
      title: "Authenticate",
      discprection: "Login using JWT & refresh tokens."

    },

    {
      number: "03",
      title: "Authorize",
      discprection: "Access protected APIs with roles."

    },


  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-black flex flex-col  via-slate-900 to-black text-white  py-16'>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-center'>
          <h1 className="md:text-5xl text-4xl md:max-w-xl max-w-lg  font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Secure Authentication. Built for the Future.</h1>
        </div>
        <p className="mt-6 max-w-2xl p-4 md:p-0 text-gray-400 text-lg text-center">
          A modern authentication platform with blazing fast performance,
          enterprise‑grade security, and a developer‑friendly experience.
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg" className="rounded-2xl">Get Started</Button>
          <Button size="lg" variant="outline" className="rounded-2xl">View Docs</Button>
        </div>
      </div>
      <div className='flex flex-col items-center gap-8 justify-center px-16 py-27 '>
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Our Auth?</h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>

          {
            cardData.map((item, key) => (
              <Card key={key} className='bg-gray-800 p-4  text-white'>
                {
                  <div className='flex flex-col items-center gap-16 text-center'>
                    <span className={`${item.color} text-xl`}>{item.icon}</span>

                    <p className='text-gray-500'>{item.title}</p>
                  </div>
                }
              </Card>

            ))
          }

        </div>
      </div>
      <div className='flex flex-col items-center gap-8 justify-center py-27 bg-gray-950 px-16 '>
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>

          {
            cardData2.map((item, key) => (
              <Card key={key} className='bg-gray-800 p-4 text-white'>
                {
                  <div className='flex flex-col items-center gap-4 text-center'>
                    <span className="text-2xl font-bold text-blue-400">{item.number}</span>
                    <p className='text-white font-bold text-lg'>{item.title}</p>
                    <p className='text-gray-500'>{item.discprection}</p>
                  </div>
                }
              </Card>

            ))
          }

        </div>

      </div>
      <div className="px-6 py-32 text-center">
        <h2 className="text-5xl font-extrabold mb-6">
          Start Building Secure Apps Today
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          Launch your authentication system in minutes with production‑ready
          security and a futuristic developer experience.
        </p>
        <Button size="lg" className="rounded-2xl px-10">Create Free Account</Button>
      </div>
    </div>
  )
}

export default Home
