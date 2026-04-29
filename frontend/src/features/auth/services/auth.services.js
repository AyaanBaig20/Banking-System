import axios from "axios"

export async function signup({name,email,password}) {
    let res = await axios.post("http://localhost:3000/api/auth/register",{name,email,password},{withCredentials:true})
    return res.data
}
export async function Login({email,password}) {
    let res = await axios.post("http://localhost:3000/api/auth/login",{email,password},{withCredentials:true})
    return res.data
}