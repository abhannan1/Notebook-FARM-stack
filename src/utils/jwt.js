import {jwtDecode} from "jwt-decode"
import axiosInstance from "../services/axios";
import { setSession } from "./session";

export const validateToken =(token) =>{
    const now = Math.round(new Date().getTime()/ 1000)
    let decodedToken
    try{
        decodedToken = jwtDecode(token)
    }catch(err){
        return false
    }

    const isValid = decodedToken && now < decodedToken.exp;



    return isValid
}

export const refreshAccessToken = async (refreshToken) => {
    if (validateToken(refreshToken)) {
        try {
            const formData = new FormData();
            formData.append('grant_type', 'refresh_token');
            formData.append('refresh_token', refreshToken);

            const response = await axiosInstance.post('/auth/token', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setSession(response.data.access_token, response.data.refresh_token);
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }
    }
};