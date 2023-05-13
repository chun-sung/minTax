'use client'
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_LOGIN_WINDOW } from "../Redux/reducers/userSlice";
import { useRouter } from "next/navigation";

// import { login, logout } from "../store/user";

// login/success 로 요청을 보내는 로직(토큰 전송 /사용자 구분)
export default function SuccessLogin() {
    
    let dispatch = useDispatch();
    let router = useRouter();

    useEffect(()=> {           
            axios({
                url: "https://min-tax-8h5x.vercel.app/api/login/success",
                method: "GET",
                withCredentials: true,
            })
            .then((result) => {                
                if(result.data.msg == 'success') {
                    dispatch(SET_LOGIN(result.data.nickName))
                } else {
                    // router.push('/notaccess')                        
                    // dispatch(SET_LOGIN_WINDOW(true))
                }
                
            }).catch( err => {                
                router.push('/notaccess')
                dispatch(SET_LOGIN_WINDOW(true))
                console.log(err)
            })
               
        },[])
        
    return (        
        <></>
    )
}