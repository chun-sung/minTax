'use client'
import { useEffect, useState } from "react"

export default function PageTop() {

    const [ fade, setFade ] = useState('')

    // 변경사항이 저장되지 않을 수 있습니다. (새로 고침시 메시지 팝업 뜸)
    const preventClose = (e) => {
        e.preventDefault();
        e.returnValue = "";             //Chrome에서 동작하도록; deprecated
      };
       
    useEffect(() => {
      (() => {
        window.addEventListener("beforeunload", preventClose);
      })();
      
      return () => {
        window.removeEventListener("beforeunload", preventClose);
      };
    },[]);    


    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동                        
        setFade('end2')        

        // setTimeout(()=> {
        //     document.querySelector('.any')?.classList.add('none') // 커버 삭제 display: 'none'
        // }, 300)
        return () => setFade('')  // 애니메이션 초기화 (클린업펑션)
    },[])
  
    useEffect(()=>{
        setTimeout(()=> {
            document.querySelector('.any').classList.add('none') // 커버 삭제 display: 'none'
        }, 300)
    })

    return (<>
            {/* 처음 쿠키 값은 lightMode 에 셋팅 된다. 그에 맞춰 hydration 에러를 처음에 피하기 위해.....  어쨌거나 처음에러만 피하자 이후 미스 매치는 어쩔수 없음*/}
        {
            <div className={`any absolute start2 ${fade} ${
                typeof window == 'undefined' ? 'bg-white'
                : ('; '+document.cookie).split(`; mode=`).pop().split(';')[0] == 'lightMode' ? 'bg-white' : 'bg-black'
                } h-full w-full z-10`}>                
            </div>        
        }
    </>)
}