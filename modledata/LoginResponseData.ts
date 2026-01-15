import User from "./User";

export default interface LoginResponseData{
    accessToken:string ,
    user:User,
    refreshToken:String,
    expirensIn:number 
}
