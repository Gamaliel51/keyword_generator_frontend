import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


const Signup = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        if(pass1 !== pass2){
            setError('Passwords do not match')
            setPass1('')
            setPass2('')
            setLoading(false)
            return
        }
        axios.post('/api/signup/', {username: username, password: pass1})
        .then((res) => {
            setLoading(false)
            setUsername('')
            setPass1('')
            setPass2('')
            navigate('/')
            return
        })
        .catch((err) => {
            setError(err.response.data.detail)
            setUsername('')
            setPass1('')
            setPass2('')
            setLoading(false)
            return
        })

    }

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
                <div className="w-full h-fit py-6 flex flex-row justify-center items-center">
                    <img src="/src/assets/keyword.png" alt="icon" className="h-20 w-20 rounded-full"/>
                    <p className="px-4 text-lg font-semibold">Keyword Finder 10000</p>
                </div>
                <p className="w-full text-2xl text-center">Sign up for an account</p>
                <div className="w-full h-3/5 flex flex-col items-center justify-evenly">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Username" className="w-11/12 h-10 px-4 py-2 border-solid border-2"/>
                    <input value={pass1} onChange={(e) => setPass1(e.target.value)} type="password" placeholder="Enter Password" className="w-11/12 h-10 px-4 py-2 border-solid border-2"/>
                    <input value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" placeholder="Confirm passwword" className="w-11/12 h-10 px-4 py-2 border-solid border-2"/>
                </div>
                <button type="submit" className="h-fit w-3/5 py-2 mb-4 rounded-sm text-white bg-[#5d9cec]">SIGN UP</button>
                <p className="text-sm text-red-500">{error}</p>
            </form>
            <Link to={'/login'} className="text-[#5d9cec]">Login</Link>
        </div>
    )
}

export default Signup