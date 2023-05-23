'use client'
import { useEffect, useState } from "react"

export default function PageTopPure() {    

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
        
    },[])
  
    return (<>  
    </>)
}