import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"


const Item = (props) => {
    const text = props.text
    const listString = props.listString
    const setListString = props.setListString
    const setKeywords = props.setKeywords

    const handleDelete = (string) => {
        const temp = listString
        const new_string = temp.replace(`${string},`, '').trim()
        setListString(new_string)
        return
    }

    return(
        <div className="min-w-fit  h-fit px-4 py-2 mx-4 my-2 flex flex-row rounded-xl bg-[#5d9cec] text-white">
            <p>{text}</p>
            <div onClick={() => handleDelete(text)} className="ml-6 cursor-pointer">X</div>
        </div>
    )
}


const Home = () => {

    const [abstract, setAbstract] = useState('')
    const [keywords, setKeywords] = useState([])
    const [listString, setListString] = useState('')

    const [loading, setLoading] = useState(false)

    const getKeywords = (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.post('/api/generate/', {abstract: abstract}, config)
        .then((res) => {
            console.log(res.data)
            setListString(res.data.data)
            setLoading(false)
            return
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            return
        })
        setLoading(false)
    }

    useEffect(() => {
        if(listString.trim() === ""){
            setKeywords([])
        }
        else{
            const array = listString.split(',')
            setKeywords(array)
        }
    }, [listString])

    if(loading){
        return(
            <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#ebeff2]">
                <p className="text-4xl font-semibold text-[#5d9cec]">Loading...</p>
            </div>
        )
    }

    return(
        <div className="min-h-screen w-full flex flex-col  items-center bg-[#ebeff2]">
            <Navbar/>
            <div className="h-[80vh] w-full my-10 py-4 flex flex-col justify-evenly items-center">
                <textarea required placeholder="Enter Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)} cols="30" rows="10" 
                    className="w-8/12 px-4 py-6 border-solid border-2"
                />
                <button onClick={(e) => getKeywords(e)} className="h-fit w-2/5 py-4 rounded-sm text-white bg-[#5d9cec]">
                    {loading ? 'Generating.....': 'Generate'}
                </button>
            </div>
            <input value={listString} readOnly={true} type="text" className="w-10/12 py-4 px-2 mb-4 border-solid border-2"/>
            <div className="w-10/12 h-fit py-4 flex flex-row flex-wrap">
                {
                    keywords.map((keyword, index) => {
                        return(
                            <Item key={index} text={keyword} listString={listString} setListString={setListString} setKeywords={setKeywords}/>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default Home