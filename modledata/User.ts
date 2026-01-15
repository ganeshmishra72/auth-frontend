export default interface User{
    id:String,
    email:String,
    name?:String,
    enable:boolean,
    imageUrl?:String,
    createAt?:String,
    updateAt?:String,
    provider:string
}