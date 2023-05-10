'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function LoginCheck() {

    const router = useRouter()
    const { user } = useSelector(state => state.user)   

    // user_id === null ? router.push('/notaccess') : null;

    useEffect(()=> {
        user.id === null ? router.push('/notaccess') : null;
    },[])
    return <></>
}