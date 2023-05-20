import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux";
import { SET_CONSULTING_PANEL, SET_LOGIN_WINDOW, SET_MEMBER_PANEL, SET_MENU_BTN } from "../Redux/reducers/userSlice";

export default function Rsidebar() {

    let router = useRouter();    
    const dispatch = useDispatch();
    const user = useSelector( state => state.user);
    return <>
        <div className={`fixed bottom-[0px] ml-2 lg:right-10 mb-3 z-20 start2 stop-dragging`}>
            <img className="hover:bg-red-300 hover:scale-110 cursor-pointer w-9 lg:w-14 bg-blue-300 border-2 rounded-full p-1 lg:p-2 mb-3" src='/Home.png' onClick={()=>{
                router.push('/')
                dispatch(SET_MENU_BTN(false))
                dispatch(SET_LOGIN_WINDOW(false))
                dispatch(SET_MEMBER_PANEL(false))
                dispatch(SET_LOGIN_WINDOW(false))
                dispatch(SET_CONSULTING_PANEL(false))
            }}/>
            <img className="hover:bg-red-300 hover:scale-110 cursor-pointer w-9 lg:w-14 bg-blue-300 border-2 rounded-full p-1 lg:p-2 mb-3" src='/telephoen.png' onClick={()=>{
                router.push('/smart')
                dispatch(SET_MENU_BTN(false))
                dispatch(SET_LOGIN_WINDOW(false))
                dispatch(SET_LOGIN_WINDOW(false))
            }}/>
            <img className="hover:bg-red-300 hover:scale-110 cursor-pointer w-9 lg:w-14 bg-blue-300 border-2 rounded-full p-1 lg:p-2 mb-3" src='/Alarm.png'onClick={()=>{
                router.push('/himoney')
                dispatch(SET_MENU_BTN(false))
                dispatch(SET_LOGIN_WINDOW(false))
                dispatch(SET_LOGIN_WINDOW(false))
            }}/>
            <img className="hover:bg-red-300 hover:scale-110 cursor-pointer w-9 lg:w-14 bg-blue-300 border-2 rounded-full p-1 lg:p-2 mb-3" src='/Account circle.png' onClick={()=>{
                router.push('/mypage');
                dispatch(SET_MENU_BTN(false))
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