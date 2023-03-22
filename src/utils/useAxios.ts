import { useEffect, useState } from "react"
import axios, { AxiosRequestConfig } from 'axios'

export const useAxios = <T>(
    config: AxiosRequestConfig<any>,
    loadOnStart: boolean = true):
    [boolean, T | undefined, string, () => void] => {
    //state variables
    const [ loading, setLoading ] = useState(true)
    const [ data, setData ] = useState<T>()
    const [ error, setError ] = useState('')
    
    useEffect(() => {
        if (loadOnStart) sendRequest()
        else setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const request = () => {
        sendRequest()
    }

    const sendRequest = () => {
        setLoading(true)
        
        axios(config)
            .then(response => {
                setError('')
                setData(response.data)
            })
            .catch(error => {
                setError(error.response.data.message)
                setData(undefined)
            })
            .finally(() => setLoading(false))
    }

    return [loading, data, error, request]
}