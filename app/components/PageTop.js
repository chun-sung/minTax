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
            {/* 처음 쿠키 값은 whiteModefh 셋팅 된다. 그에 맞춰 hydration 에러를 처음에 피하기 위해..... */}
        {
            <div className={`any absolute start2 ${fade} ${
                typeof window == 'undefined' ? 'bg-white'
                : ('; '+document.cookie).split(`; mode=`).pop().split(';')[0] == 'lightMode' ? 'bg-white' : 'bg-black'
            } h-full w-full z-20`}></div>            
        }
    </>)
}