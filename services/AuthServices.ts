import apiClient from "@/config/ApliClient";
import LoginData from "@/modledata/LoginData";
import LoginResponseData from "@/modledata/LoginResponseData";
import type RegisterData from "@/modledata/RegisterData";
import User from "@/modledata/User";
import { UUID } from "crypto";

// registeruser 
 export const registerUser=async (singupUserData:RegisterData)=>{
    // api cakll to server to store data
    const respons=await apiClient.post("/auth/register",singupUserData)
    return respons.data;
}


// login

export const loginUser=async (loginUserData:LoginData)=>{
   
    const respons=await apiClient.post<LoginResponseData>("/auth/login",loginUserData)
    return respons.data
}

export const logoutUser=async ()=>{
    const respons=await apiClient.post("/auth/logout");
    return respons.data
}
// get current logion

export const getUserInfo = async (emailId?: String | undefined) => {
  if (!emailId) throw new Error("Email missing");

  const response = await apiClient.get(
    `/users/email/${(emailId)}`
  );
  return response.data;
};

// refres
export const refreshToken=async()=>{
    const respons=await apiClient.post<LoginResponseData>("/auth/refresh")
    return respons.data;
}

// for image update
export const updateProfileImage=async(file:File)=>{
    const fromData=new FormData()
    fromData.append("file",file)

    const response=await apiClient.post("/users/profile/image",fromData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    return response.data
}

// for delete
export const deleteAccount=async(userId?:String | undefined )=>{
     const response=await apiClient.delete(`/users/${userId}`)
     return response.data;
}

// for update

export const updateAccount=async(userId: String | undefined, data: { name: String | undefined })=>{
     const response = await apiClient.put(`/users/id/${userId}`, data)
  return response.data
}