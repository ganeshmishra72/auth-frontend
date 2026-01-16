import useAuth from "@/auth/store";
import { refreshToken } from "@/services/AuthServices";
import axios from "axios";

const apiClient=axios.create(
    {
      baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,   
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true,
      timeout:10000
    }
)

// interceptors
apiClient.interceptors.request.use(config=>{

  const access=useAuth.getState().accessToken
    if(access){
      config.headers.Authorization=`Bearer ${access}`;
    }
  return config;
})


let isRefresh=false
let pending : any[]=[];
// response interceptors


function queueRequest(cd:any){
  pending.push(cd);
}

function resolveQueue(newToken:string | null){
  pending.forEach((cb)=>cb(newToken));
  pending=[];
}

apiClient.interceptors.response.use(
  // success
  (response)=>response,
  // error 
  async(error)=>{
   
    
const is401 = error?.response?.status === 401;
 const original=error.config
      
 if(!is401  || original._retry){
  // message
  return Promise.reject(error)
 }

//   we will try to refresh token
original._retry = true;
  if(isRefresh){
     return new Promise((resolve, reject) => {
        queueRequest((newToken: string) => {
          if (!newToken) return reject();
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(apiClient(original));
        });
      });
  }

  isRefresh=true
  try {
      console.log("start refreshing...");
    const LoginResponseData=await refreshToken()
    const newToken=LoginResponseData.accessToken
    if(!newToken){
      throw new Error("no access token recived!!")
    }
    useAuth.getState().changeLocalLogin(LoginResponseData.accessToken,LoginResponseData.user,true,false);

    resolveQueue(newToken)
     original.headers = original.headers || {};
    original.headers.Authorization=`Bearer ${newToken}`;
    return apiClient(original);
  } catch (error) {
     resolveQueue(null);
     useAuth.getState().logout();
     return Promise.reject(error)
  }
  finally{
    isRefresh=false
  }
 
})
export default apiClient;