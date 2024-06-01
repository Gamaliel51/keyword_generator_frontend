import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"


const Modal = (props) => {
    const abstract = props.abstract
    const keywords = props.keywords
    const setShowModal = props.setShowModal

    return(
        <div className="min-h-screen w-full flex flex-col justify-center fixed top-0 left-0 z-20 bg-[#5d9cec] bg-opacity-50">
            <div onClick={() => setShowModal(false)} className="absolute top-5 right-5 font-bold text-3xl text-white cursor-pointer">X</div>
            <div className="h-[80vh] w-8/12 mx-auto flex flex-col justify-evenly items-center bg-[#ebeff2]">
                <textarea value={abstract} readOnly={true} id="" cols="30" rows="8" className="w-10/12 px-4 py-6 border-solid border-2"/>
                <textarea value={keywords} readOnly={true} id="" cols="30" rows="8" className="w-10/12 px-4 py-6 border-solid border-2"/>
            </div>
        </div>
    )
}


const History = () => {

    const [showModal, setShowModal] = useState(false)
    const [currentAbstract, setCurrentAbstract] = useState('')
    const [currentKeywords, setCurrentKeywords] = useState('')
    const [history, setHistory] = useState([])

    const diplayData = (abstract, keywords) => {
        setCurrentAbstract(abstract)
        setCurrentKeywords(keywords)
        setShowModal(true)
    }


    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }
        axios.get('/api/history/', config)
        .then((res) => {
            console.log(res.data)
            setHistory(res.data.data)
            return
        })
        .catch((err) => {
            console.log(err)
            return
        })
    }, [])

    return(
        <div className="min-h-screen w-full flex flex-col items-center bg-[#ebeff2]">
            <Navbar/>
            {showModal && <Modal abstract={currentAbstract} keywords={currentKeywords} setShowModal={setShowModal}/>}
            <div className="w-full my-6 flex flex-col justify-evenly">
                {history.map((item, index) => {
                    return(
                        <div key={index} onClick={() => diplayData(item.abstract, item.keywords)} className="w-10/12 h-fit px-4 py-6 mx-auto my-10 flex flex-row cursor-pointer bg-white">
                            <p className="w-fit mx-4 px-4">{index + 1}</p>
                            <p className="w-4/6 text-start px-6 mr-10 border-solid border-l-2">{item.abstract}</p>
                            <p className="w-2/6 px-6 border-solid border-l-2">{item.keywords}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default History
