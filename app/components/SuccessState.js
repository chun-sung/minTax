'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, SET_LOGOUT } from "../Redux/reducers/userSlice";
import { useRouter } from "next/navigation";

// import { login, logout } from "../store/user";

// login/success 로 요청을 보내는 로직(토큰 전송 /사용자 구분)
export default function SuccessLogin() {
    
    let dispatch = useDispatch();
    let router = useRouter();

    useEffect(()=> {           
            axios({
                url: "https://min-tax-8h5x.vercel.app/login/success",
                method: "GET",
                withCredentials: true,
            })
            .then((result) => {
                
                if(result.data.msg == 'success') {
                    const {user_id, nickName} = result.data;
                    dispatch(SET_LOGIN({user_id, nickName}))
                } else {
                    dispatch(SET_LOGOUT(null))
                }
                
            }).catch( err => {                
                console.log(err)
            })
               
        },[])
        
    return (        
        <></>
    )
}