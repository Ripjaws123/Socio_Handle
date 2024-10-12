import axios from "axios"
import { USER_API_END_POINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getOtherUsers } from "@/app/redux/userSlice"
const useGetOtherUsers =  (id)=>{
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const response = await axios.get(`${USER_API_END_POINT}/getotherprofile/${id}`,{
                    withCredentials:true,
                })
                dispatch(getOtherUsers(response.data.otherUsers))
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers();
    },[id, dispatch])
    
}

export default useGetOtherUsers;