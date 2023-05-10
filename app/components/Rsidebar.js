import { useRouter } from "next/navigation"

export default function Rsidebar() {

    let router = useRouter();    
    
    return <>
        <div className={`fixed bottom-[0px] right-2 lg:right-10 mb-3 z-20 start2`}>
            <img className="hover:bg-red-300 hover:scale-110 cursor-pointer w-9 lg:w-14 bg-blue-300 border-2 rounded-full p-1 lg:p-2 mb-3" src='/Home.png' onClick={()=>{
                router.push('/')
            }}/>
            <img className="hover:bg-red-300 hover:scale-110 cursor-pointer w-9 lg:w-14 bg-blue-300 border-2 rounded-full p-1 lg:p-2 mb-3" src='/telephoen.png' onClick={()=>{
                router.push('/smart')
            }}/>
            <img className="hover:bg-red-300 hover:scale-110 cursor-pointer w-9 lg:w-14 bg-blue-300 border-2 rounded-full p-1 lg:p-2 mb-3" src='/Alarm.png'onClick={()=>{
                router.push('/himoney')
            }}/>
            <img className="hover:bg-red-300 hover:scale-110 cursor-pointer w-9 lg:w-14 bg-blue-300 border-2 rounded-full p-1 lg:p-2 mb-3" src='/Account circle.png' onClick={()=>{
                router.push('/renew')
            }}/>
            <img className='hover:bg-red-300 bg-white hover:scale-110 cursor-pointer w-9 lg:w-14  border-2 rounded-full p-1 lg:p-1 mb-10 inbisible' src='/top.svg' onClick={()=>{
                window.scroll({
                    top:0,
                    behavior: 'smooth'
                }); 
            }}/>
        </div> 
    </>
}