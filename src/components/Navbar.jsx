import { Link, useNavigate } from "react-router-dom"


const Navbar = () => {

    const navigate = useNavigate()

    const logOut = () => {
        sessionStorage.removeItem('accessToken')
        navigate('/login')
    }

    return(
        <nav className="w-8/12 h-20 flex flex-row rounded-b-xl justify-between bg-white">
            <div className="h-full w-5/12 flex items-center pl-4">
                <img src="/src/assets/keyword.png" alt="icon" className="h-16 rounded-full" />
                <p className="h-fit px-4 text-lg font-semibold">Keyword Finder 10000</p>
            </div>
            <div className="h-full w-9/12 px-20 pt-6 flex flex-row justify-end">
                <Link className="hover:text-[#5d9cec]" to={"/"}>Home</Link>
                <Link className="hover:text-[#5d9cec] ml-24" to={"/history"}>History</Link>
                <div onClick={() => logOut()} className="hover:text-[#5d9cec] cursor-pointer ml-24">LogOut</div>  
            </div>
        </nav>
    )
}


export default Navbar