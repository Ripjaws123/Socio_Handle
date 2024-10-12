import axios from "axios"
import { USER_API_END_POINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getProfile} from "@/app/redux/userSlice"
const useGetProfile =  (id)=>{
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const response = await axios.get(`${USER_API_END_POINT}/getprofile/${id}`,{
                    withCredentials:true,
                })
                dispatch(getProfile(response.data.user))
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyProfile();
    },[id, dispatch])
    
}

export default useGetProfile;