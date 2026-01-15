'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import useAuth from '@/auth/store'
import { deleteAccount, updateAccount, updateProfileImage } from '@/services/AuthServices'
import toast from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const user = useAuth(state => state.user)
  const navigate=useRouter()
  
  const changeImage=async(e:React.ChangeEvent<HTMLInputElement>)=>{
      const file=e.target.files?.[0]
        if(!file) return
      try {
        
        const updateUser=await updateProfileImage(file)
        useAuth.getState().changeLocalLogin(
          useAuth.getState().accessToken!,
          updateUser,
          true,
          false
        )

        toast.success("Success Image Updaet!")
      } catch (error) {
        console.log(error);
        toast.error("image uplaod failed")
        
      }
  }
  
  const deleteUser=async()=>{
    try {
     const data= await deleteAccount(user?.id)
     
     toast.success("User Delete Successfully !!")
     useAuth.getState().logout()
      navigate.replace("/")
      
    } catch (error) {
      console.log(error);
      toast.error("Some Error Occurs On Deleteing")
      
      
    }
  }

  const [fromData,setFromData]=useState({
    name:user?.name || ''
  })

  const handelValue=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFromData({
      ...fromData,
      [e.target.name]:e.target.value
    });
  }
  const handelUpadetUser=async()=>{
     
    try {
      
       if (!fromData.name.trim()) {
      toast.error("Name is required")
      return
    }

      const updatedUser = await updateAccount(user?.id,{
        name:fromData.name
      })

      useAuth.getState().changeLocalLogin(
        useAuth.getState().accessToken!,
        updatedUser,
        true,
        false
      )

      toast.success("Profile updated successfully")
    setIsEditing(false)
    } catch (error) {
        console.log(error)
    toast.error("Update failed")
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-10 text-white">
     
     <input
  type="file"
  accept="image/*"
  hidden
  id="imageUpload"
  onChange={changeImage}
/>

      <h1 className="text-4xl font-bold text-center mb-10">
        User Profile
      </h1>

      {/* PROFILE CARD */}
      <Card className="mx-auto max-w-3xl rounded-3xl border border-white/10 
        bg-white/5 backdrop-blur-xl shadow-2xl transition hover:shadow-purple-500/20">

        {/* Header */}
        <CardHeader className="flex flex-col items-center gap-4 pb-6 border-b border-white/10">
          <Avatar className="w-32 h-32 ring-4 ring-purple-500/40">
            <AvatarImage src={user? user.imageUrl?.trim() : "https://api.dicebear.com/7.x/thumbs/svg?seed=user"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="text-center text-white">
            <CardTitle className="text-2xl font-semibold">
              {user?.name || 'User'}
            </CardTitle>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <Button onClick={()=>document.getElementById("imageUpload")?.click()} variant="outline" className="rounded-xl">
            Change Picture
          </Button>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-8 pt-8">

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={  fromData.name.trim()}
                onChange={handelValue}
                readOnly={!isEditing}
                 name="name"
                className="rounded-xl bg-black/40 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={user?.email.trim()}
                readOnly
                className="rounded-xl bg-black/40 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label>Provider</Label>
              <Input
                value={user?.provider}
                readOnly
                className="rounded-xl bg-black/40 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Input
                value={user?.enable ? 'Active' : 'Disabled'}
                readOnly
                className="rounded-xl bg-black/40 border-white/10"
              />
            </div>
          </div>

          {/* Actions */}
          {!isEditing ? (
            <Button
              onClick={() =>{setFromData({name:user?.name || ''}), setIsEditing(true)}}
              className="w-full rounded-2xl py-6 text-lg bg-purple-600 hover:bg-purple-700"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-4 ">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className=" rounded-2xl py-6"
              >
                Cancel
              </Button>
              <Button
                className=" rounded-2xl py-6 bg-green-600 hover:bg-green-700"
                onClick={handelUpadetUser}
              >
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ACCOUNT SETTINGS */}
      <Card className="mx-auto max-w-3xl mt-10 rounded-3xl border border-white/10 
        bg-white/5 backdrop-blur-xl shadow-xl">

        <CardHeader>
          <CardTitle className="text-xl text-white">Account Settings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          
          <Button onClick={()=>deleteUser()} variant="destructive" className="w-full rounded-xl py-5">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
