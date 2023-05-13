'use client'
import Link from "next/link"
import Seo from "./Seo"
import { useState } from "react"
import Rsidebar from "./Rsidebar";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGOUT,SET_LOGIN, SET_LOGIN_WINDOW,SET_MEMBER_PANEL,SET_CONSULTING_PANEL,SET_MENU_BTN } from "../Redux/reducers/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import SuccessLogin from "./SuccessState";

export default function Header() {

    const { user } = useSelector(state => state.user);
    
    const [user_id, setUserId] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch();
    const router = useRouter();
    
    // 로그인 함수
    function loginEnter() {
        if(user_id == '') {
            alert('ID를 입력하세요')
            return 
        } else if(password == '') {
            alert('패스워드를 입력하세요')
            return
        }
        let user = {user_id, password}

        fetch('https://min-tax-8h5x.vercel.app/api/login', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        .then((res) => {
        return res.json();
        })
        .then(data => {
            // console.log(data)
            if(data.msg == 'success') {

                // alert('로그인 완료!')                                   
                router.push('/mypage')
                dispatch(SET_LOGIN(data.nickName))
                dispatch(SET_LOGIN_WINDOW(false))
            } else if(data.msg == 'pw_fail') {

                alert('비밀번호가 틀립니다.')
            } else if( data.msg == 'id_fail') {

                alert('존재하지 않는 회원 ID 입니다.')
            }
        })
        .catch((err) => console.log(err))
    }


    return <>        
        {/* Seo */}        
        <Seo title='Home | MTAX'/>
        <SuccessLogin />
        {/* 모달 효과 */}
        <div className={ user.menu == true ? `absolute bg-neutral-700 w-full h-full opacity-70 z-10` : null} onClick={()=>dispatch(SET_MENU_BTN(false))}></div>        
        <div className={ user.login == true ? `absolute bg-neutral-700 w-full h-full opacity-70 z-10` : null} onClick={()=>dispatch(SET_LOGIN_WINDOW(false))}></div>        

        {/* 헤더 */}
        {/* 로그인 & 로그아웃 Btn */}
        <div className="fixed w-full z-50 bg-white border-b-[1px] lg:border-[1px] border-b-[#031D4A]">    
            <div className="header flex justify-center items-center gap-1 lg:p-5 m-auto h-full lg:h-[112px] z-50 ">    
                <Link href='/' onClick={()=>{dispatch(SET_MENU_BTN(false))}}><img className="w-20 lg:w-32" src="/logo.svg" /></Link>
                <div className="absolute ml-[180px] top-[53px] lg:top-[80px] w[100px] lg:w-[750px]  text-right">
                    <div className="relative inline-block text-[12px] lg:text-[16px] ml-[-15px] lg:ml-[-30px] top-[-0px] lg:top-[3px] text-neutral-500">{user.id}
                        { user.id !== null ?
                            <span className="logOutBtn font-bold border-[1px] border-red-500 rounded-xl hover:bg-red-400 hover:text-white bg-white  absolute px-2 lg:px-3 py-1 lg:py-0.5 text-red-500 right-[-60px] lg:right-[-80px] top-[-10px] lg:top-[-5px]  cursor-pointer" onClick={()=> {
                                if(confirm('로그아웃 하시겠습니까?')) {
                                    axios({
                                        url:"https://min-tax-8h5x.vercel.app/api/logout",
                                        method: "POST",
                                        withCredentials: true,
                                    }).then((res) => {
                                        if(res.data.msg == 'success') {
                                            dispatch(SET_LOGOUT(null));
                                            dispatch(SET_CONSULTING_PANEL(false));
                                            dispatch(SET_MENU_BTN(false));
                                            // console.log('로그아웃 성공')
                                            router.push('/')
                                        }
                                    })
                                }
                            }}>logout</span>
                            : <span className="logOutBtn font-bold absolute border-[1px] border-red-500 rounded-xl text-white bg-red-400  hover:bg-white px-3 lg:px-5  py-1 lg:py-0.5 hover:text-red-500 right-[-80px] lg:right-[-83px] top-[-23px] lg:top-[-px] cursor-pointer" onClick={()=> {
                                // signIn()
                               dispatch(SET_LOGIN_WINDOW(true)); 
                               dispatch(SET_MEMBER_PANEL(false));   
                               dispatch(SET_CONSULTING_PANEL(false));
                               dispatch(SET_MENU_BTN(false));
                            }}>login</span>
                            
                        }
                    </div>
                </div>


                {/* 모바일 메뉴 버튼 */}
                <div className="hambuger hidden hover:bg-red-50 cursor-pointer hover:scale-105" onClick={()=>{dispatch(SET_MENU_BTN(!user.menu));dispatch(SET_LOGIN_WINDOW(false));dispatch(SET_MEMBER_PANEL(false));dispatch(SET_CONSULTING_PANEL(false))  }}>
                    <img className="w-[40px] z-40" src="/hamburger.svg"/>
                </div>     
            </div>    


            {/* 네비게이션 */}
            <nav className={user.menu !== true ? `lg:bg-[#031D4A] px-10 lg:px-28 tracking-[0px] bg-slate-100  start rounded lg:rounded-none`
                    : `lg:bg-[#031D4A] px-10 lg:px-28 tracking-[0px] bg-slate-100 z-20 rounded lg:rounded-none start end`}>
                <div className="w-full lg:flex justify-between items-center gap-8 m-auto h-full lg:h-[61px] max-w-[1820px] pb-3 ">
                    <p className="text-black pt-3 lg:pb-0 lg:text-white  mt-3 mb-3 lg:mt-2  font-bold hover:text-blue-300 cursor-pointer"><Link href='/smart' onClick={()=> {
                        dispatch(SET_MENU_BTN(false))
                    }}>SMART 서비스</Link></p>
                    <hr className="p-3 lg:hidden" />
                    <p className="text-black lg:text-white mb-3 lg:mt-4 font-bold hover:text-blue-300 cursor-pointer"><Link href='/himoney' onClick={()=>{dispatch(SET_MENU_BTN(false))}}>고소득자 플랜</Link></p>
                    <hr className="p-3 lg:hidden" />
                    <p className="text-black lg:text-white mb-3 lg:mt-4 font-bold hover:text-blue-300 cursor-pointer"><Link href='/bubin' onClick={()=>{dispatch(SET_MENU_BTN(false))}}>법인 컨설팅</Link></p>
                    <hr className="p-3 lg:hidden" />
                    <p className="text-black lg:text-white mb-3 lg:mt-4 font-bold hover:text-blue-300 cursor-pointer"><Link href='/renew' onClick={()=>{dispatch(SET_MENU_BTN(false))}}>세무상담</Link></p>
                    <hr className="p-3 lg:hidden" />
                    <p className="text-black lg:text-white mb-3 lg:mt-4 font-bold hover:text-blue-300 cursor-pointer"><Link href='/susu' onClick={()=>{dispatch(SET_MENU_BTN(false))}}>수수료안내</Link></p>
                    <hr className="p-3 lg:hidden" />
                    <p className="text-black lg:text-white mb-3 lg:mt-4 font-bold hover:text-blue-300 cursor-pointer"><Link href='/board' onClick={()=>{dispatch(SET_MENU_BTN(false))}}>게시판</Link></p>
                    <hr className="p-3 lg:hidden"/>
                    { user.id !== null ?
                        <>
                        <p className="text-red-400 lg:text-red-400 mb-3 lg:mt-4 font-bold hover:text-blue-300 cursor-pointer"><Link href='/mypage' onClick={()=>{dispatch(SET_MENU_BTN(false))}}>MyPage</Link></p>
                        <hr className="p-3 lg:hidden"/>
                        </>
                        : null
                    }
                </div>
            </nav>      
        
        {/* 로그인 패널 */}        
        <div className="relative m-auto lg:w-[420px] ">
        {
        user.login == true ? 
            <div className={user.login !== true ? null 
                :  "absolute border-stone-800 border-[1px] bg-gray-100  w-full lg:w-[420px] lg:mt-10 top-[40px] lg:top-[200px] p-5 h-64 shadow-2xl z-10"
                }>
                <div className="text-center">                   
                    <span className="text-xl font-bold">Login</span><br /><br />
                </div>
                <div className="lg:ml-[-10px] lg:w-96 mb-5  text-center">   
                    <form>
                        <div className="relative sm:mb-0 flex-grow w-full mb-2">
                            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600 mr-2">ID </label>
                            <input type="text" id="full-name" name="user_id" className="w-56 bg-gray-300 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <div className="relative sm:mb-0 flex-grow w-full mt-2 ml-[-4px]">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600 mr-2">PW </label>
                            <input type="password" id="name" name="password" className="w-56 bg-gray-300 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:bg-transparent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onKeyUp={()=>{ window.event.keyCode === 13 ? loginEnter() : null }} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </form>
                </div>
                <div className="mt-2 ml-6 text-center">
                    <button className="p-2 px-5 rounded-sm mr-2 bg-blue-500 hover:bg-blue-400 text-white" onClick={()=> { return loginEnter()

                        
                    }}>확인</button>

                    <button className="p-2 px-5 rounded-sm bg-red-500 hover:bg-red-300 text-white" onClick={()=> {
                        dispatch(SET_LOGIN_WINDOW(false))
                    }}>취소</button>
                </div>
            </div> 
            : null
        }        
        </div> 
        </div>
        <div className="h-[60px] lg:h-[170px]"></div>       



        {/* 하단 오른쪽 사이드 메뉴 */}

        <Rsidebar />
        <style jsx>{`
            .user_id:hover .logOutBtn {
                display: inline;
            }
        `}</style>
    </>
}
 