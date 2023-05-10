'use client'
import { useEffect } from "react";
import PageTop from "../components/PageTop";
import Seo from "../components/Seo";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function NotAccess () {

    let user = useSelector(state=>state.user)
    const router = useRouter()

    // console.log(user.id)

    // useEffect(() =>{
    //     setTimeout(() => {
    //         user.id !== null ? router.push("/") : null
    //     },1000)
    // },[user])

    return <>
    <Seo title="NotAccess | MinTAX" />
    <PageTop />  
    <h1 className="text-center mt-10 text-2xl text-red-500 font-extrabold">접근 권한이 없습니다.</h1>
    <div className="h-screen"></div>
    </>
}