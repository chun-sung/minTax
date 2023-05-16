'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, SET_LOGOUT } from "../Redux/reducers/userSlice";
import { useRouter } from "next/navigation";



// 새로고침 및 접속시에  
//  token 이 유효하면  token 정보로 로그인을 유지만 시킨다. (새로 고침시)
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