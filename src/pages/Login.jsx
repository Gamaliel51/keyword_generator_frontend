import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { checkAuth } from "../utility"


const Login = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.post('/api/login/', {username: username, password: password})
        .then((res) => {
            setLoading(false)
            sessionStorage.setItem('accessToken', res.data.access)
            sessionStorage.setItem('refreshToken', res.data.refresh)
            setError('')
            setUsername('')
            setPassword('')
            navigate('/')
        })
        .catch((err) => {
            setError(err.response.data.detail)
            setUsername('')
            setPassword('')
            setLoading(false)
            return
        })

    }

    useEffect(() => {
        if(checkAuth()){
            navigate('/')
        }
    }, [])

    if(loading){
        return(
            <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#ebeff2]">
                <p className="text-4xl font-semibold text-[#5d9cec]">Loading...</p>
            </div>
        )
    }

    return(
        <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#ebeff2]">
            <form onSubmit={handleSubmit} className="h-[70vh] w-3/12 mb-4 flex flex-col items-center bg-white">
                <div className="w-full h-1/5 py-6 flex flex-row justify-center items-center">
                    <img src="/src/assets/keyword.png" alt="icon" className="h-20 w-20 rounded-full"/>
                    <p className="px-4 text-lg font-semibold">Keyword Finder 10000</p>
                </div>
                <p className="w-full text-2xl text-center">Login to your account</p>
                <div className="w-full h-2/5 my-6 flex flex-col items-center justify-evenly">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Username" className="w-11/12 h-10 px-4 py-2 border-solid border-2"/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" className="w-11/12 h-10 px-4 py-2 border-solid border-2"/>
                </div>
                <button type="submit" className="h-fit w-3/5 py-2 mb-4 rounded-sm text-white bg-[#5d9cec]">LOGIN</button>
                <p className="text-sm text-red-500">{error}</p>
            </form>
            <Link to={'/signup'} className="text-[#5d9cec]">Sign Up</Link>
        </div>
    )
}


export default Login