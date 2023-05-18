'use client'
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_LOGIN_WINDOW } from "../Redux/reducers/userSlice";
import { useRouter } from "next/navigation";

// 새로고침 및 접속시에  
// token 이 유효하면  token 정보로 로그인을 유지시키고 ( 새로 고침시 )

// token 이 유효하지 않으면 ( 에러 발생시/token 인증 실패 ) 
//   1. 미들웨어에서 먼저 리다이랙션 한다.('/' 메인 페이지로 이동 )
//           - 미들웨어는 /mypage url 경로만 token 유무 만 1차 확인(2차 확인은 SuccessLogin )

//   2. /notaccess 로 리다이랙션 하고  (SuccessLogin)
//   3. Login 패널을 화면에 띠운다.    (SuccessLogin)

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
                    router.push('/notaccess')
                    dispatch(SET_LOGIN_WINDOW(true))
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