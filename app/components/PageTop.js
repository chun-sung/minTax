'use client'
import { useEffect, useState } from "react"

export default function PageTop() {

    const [ fade, setFade ] = useState('')

    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동
        setFade('end2')
        setTimeout(()=> {
            document.querySelector('.any')?.classList.add('none') // 커버 삭제 display: 'none'
        }, 200)
        return () => setFade('')  // 애니메이션 초기화
    },[])

    // useEffect(()=>{
    //     setTimeout(()=> {
    //         document.querySelector('.any').classList.add('none') // 커버 삭제 display: 'none'
    //     }, 200)
    // },[])

    return (<>
        {/* <div className={`any absolute lg:relative start2 ${fade} bg-white h-full w-full z-20`}></div> */}
        <div className={`any absolute start2 ${fade} bg-white h-full w-full z-20`}></div>
    </>)
}