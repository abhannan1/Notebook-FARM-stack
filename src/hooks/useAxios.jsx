import { useCallback, useEffect, useRef, useState } from "react"
import axiosInstance from "../services/axios"

export const useAxios = (url, ...dependencies) => { 
    const [isLoading, setIsLoading] = useState(false) 
    const [data, setData] = useState([])
    const [isError, setIsError] = useState(false)
    const isMounted = useRef(false)


    //every time the rerender happens the fuctions get created from scratch 
    //and if we pass fetchTodos to get rid of warning it will create the infinite loop as the fetchData 
    //includes the changing of states so use the useCallback and dependencies of useEffect in useCallback as well
const fetchData = useCallback((url)=>{
        console.log('this is called')
        setIsLoading(true)
            axiosInstance.get(url)
            .then((res)=>{
                setData(res.data)
                setIsLoading(false)
                console.log(res.data)})
            .catch((err)=>{
                console.error(err)
                setIsLoading(false)
                setIsError(true)
            })
    },[...dependencies, url])
    
    useEffect(()=>{
        if(!isMounted.current){
            console.log('inside is called')
            fetchData(url)
        }
        isMounted.current = true
    },[...dependencies, url, fetchData])

return{isLoading, isError, data, fetchData}

}