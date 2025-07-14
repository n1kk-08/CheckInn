import { useEffect, useState } from "react"
import axios from "axios"

// Configure axios base URL
// axios.defaults.baseURL = "http://localhost:8000/api"


const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {

        const fetch = async () =>{

            setLoading(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
                
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }

        fetch()

    }, [url])

    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data)
            
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return {data, loading , error, reFetch}
}

export default useFetch;

