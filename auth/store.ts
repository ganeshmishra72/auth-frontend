import LoginData from "@/modledata/LoginData"
import LoginResponseData from "@/modledata/LoginResponseData"
import User from "@/modledata/User"
import { loginUser, logoutUser } from "@/services/AuthServices"
import {create} from "zustand"
import { persist } from "zustand/middleware"
const LOCAL_KEY="auth_app"


type AuthStatus={
    accessToken:string |null,
    user:User |null,
    authStatus:boolean,
    authLoading:boolean,
    login: (loginData:LoginData)=>Promise<LoginResponseData>,
    logout:(silent?:boolean)=>void,
    checkLogin:()=>boolean | undefined,

    changeLocalLogin:(accessToken:string,user:User,authStatus:boolean,authLoading:boolean)=>void
}

//  acutal Golab Zustand
const useAuth = create<AuthStatus>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      // 🔐 LOGIN
      login: async (loginData) => {
        set({ authLoading: true });

        try {
          const response = await loginUser(loginData);

          set({
            accessToken: response.accessToken,
            user: response.user,
            authStatus: true,
            authLoading: false,
          });

          return response;
        } catch (error) {
          set({
            authStatus: false,
            authLoading: false,
          });
          throw error;
        }
      },

      // 🚪 LOGOUT
      logout: async (silent = false) => {
        set({ authLoading: true });

        try {
          if (!silent) {
            await logoutUser();
          }
        } catch (error) {
          console.error(error);
        } finally {
          set({
            accessToken: null,
            user: null,
            authStatus: false,
            authLoading: false,
          });
        }
      },

      // ✅ CHECK LOGIN
      checkLogin: () => {
        return !!get().accessToken;
      },

      changeLocalLogin(accessToken, user, authStatus, authLoading) {
        set({
          accessToken,
          user,
          authStatus,
          authLoading
        });
      },
    })
    ,
    {
      name: LOCAL_KEY, // ✅ persist config yahin aata hai
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        authStatus: state.authStatus,
      }),
    }
  )
);

export default useAuth;