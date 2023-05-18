'use client'
import Link from "next/link"
import Seo from "./Seo"
import { useEffect, useState } from "react"
import Rsidebar from "./Rsidebar";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGOUT,SET_LOGIN, SET_LOGIN_WINDOW,SET_MEMBER_PANEL,SET_CONSULTING_PANEL,SET_MENU_BTN } from "../Redux/reducers/userSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import SuccessState from "./SuccessState";

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
        let userInfo = {user_id, password}

        fetch('https://min-tax-8h5x.vercel.app/api/login', {
            method: 'POST',
            body: JSON.stringify(userInfo)
        })
        .then((res) => {
        return res.json();
        })
        .then(data => {
            // console.log(data)
            if(data.msg == 'success') {

                const { user_id, nickName } = data;
                dispatch(SET_LOGIN({user_id, nickName}))
                dispatch(SET_LOGIN_WINDOW(false))
                router.push('/mypage')
            } else if(data.msg == 'pw_fail') {

                alert('비밀번호가 틀립니다.')
            } else if( data.msg == 'id_fail') {

                alert('존재하지 않는 회원 ID 입니다.')
            }
        })
        .catch((err) => console.log(err))
    }

    // 다크모드 1 [로컬 스토리지] (구현 x 이해만하자)
    // useEffect(()=> {
    //     if(typeof window != 'undefined') {        // 현재 위치가 브라우저 인지 서버인지 판단하는 조건문
    //         localStorage.setItem('mode', 'dark')  // 로컬 스토리지는 클라이언트 컴포넌트에서 출력가능
    //     }
    // },[]) // 로컬 스토리지 사용하면 HTML 마운트 이후 작동하기 때문에 라이트 모드가 1초간 보이는 문제있다.


    // 다크모드 2 [cookies 저장]       
    // document.cookie = 'mode=dark; max-age=3600;';   콘솔에서 실행하면 쿠키 저장됨
    
    //  서버 컴포넌트에서 출력 가능하다. - ** 쿠키는 서버 컴포넌트에서만 사용가능
    //  console.log(cookies().get('mode'))


   // 쿠키에 최초 라이트 모드 값을 셋팅 한다.
    useEffect(()=> {
        let val = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]  // mode 가 없으면 '' 리턴 됨
        if(val == '') {
            document.cookie = 'mode=lightMode; max-age=' + (3600 * 24 * 400)
        }
    },[])



    return <>        
        {/* Seo */}        
        <Seo title='Home | MTAX'/>
        <SuccessState />
        {/* 모달 효과 */}
        <div className={ user.menu == true ? `absolute bg-neutral-700 w-full h-full opacity-70 z-10` : null} onClick={()=>dispatch(SET_MENU_BTN(false))}></div>        
        <div className={ user.login == true ? `absolute bg-neutral-700 w-full h-full opacity-70 z-10` : null} onClick={()=>dispatch(SET_LOGIN_WINDOW(false))}></div>        

        {/* 헤더 */}
        {/* 로그인 & 로그아웃 Btn */}
        <div className="fixed w-full z-50 bg-white border-b-[1px] lg:border-[1px] border-b-[#031D4A]">    
            <div className="header flex justify-center items-center gap-1 lg:p-5 m-auto h-full lg:h-[112px] z-50 ">    
                <Link href='/' onClick={()=>{dispatch(SET_MENU_BTN(false))}}><img className="w-20 lg:w-32" src="/logo.svg" /></Link>
                <div className="absolute ml-[180px] top-[53px] lg:top-[80px] w[100px] lg:w-[750px]  text-right">
                    
        {/* 로그인 한 사용자 닉네임 표시*/}
                    <div className="relative inline-block text-[12px] lg:text-[16px] ml-[-15px] lg:ml-[-30px] top-[-5px] lg:top-[3px] text-neutral-500">{user.nickName}
                        { user.user_id !== null ?
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
                                    }).catch(err => console.log(err))
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
                    {
                       typeof window == 'undefined' ? null 
                        : ('; '+document.cookie).split(`; mode=`).pop().split(';')[0] == 'darkMode' ? <img className="w-[40px] z-40" src="/hamburger_white.svg"/>
                        : <img className="w-[40px] z-40" src="/hamburger.svg"/>
                    }   
                </div>     
            {/* 다크모드 버튼 */}
            <div className="absolute left-[75px] lg:left-[100px]  top-[36px] lg:top-[70px] w[100px] lg:w-[750px] ">

                { typeof window == 'undefined' ? null :
                  ('; '+document.cookie).split(`; mode=`).pop().split(';')[0] == 'lightMode'
                
                   ? <span className="text-3xl" onClick={()=> {
                        let mode = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
                        if(mode == 'lightMode') {
                            document.cookie = 'mode=darkMode; max-age=' + (3600 * 24 * 400)
                            router.refresh()
                        } else {
                            document.cookie = 'mode=lightMode; max-age=' + (3600 * 24 * 400)
                            router.refresh()
                        }
                    }}>🌙</span>
                    : <span className="text-3xl" onClick={()=> {
                        let mode = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
                        if(mode == 'lightMode') {
                            document.cookie = 'mode=darkMode; max-age=' + (3600 * 24 * 400)
                            router.refresh()
                        } else {
                            document.cookie = 'mode=lightMode; max-age=' + (3600 * 24 * 400)
                            router.refresh()
                        }
                    }}>🌞</span>
                }
                </div>
            </div>    

            

            {/* 네비게이션 */}
            <nav className={user.menu !== true ? `lg:bg-[#031D4A] px-10 lg:px-28 tracking-[0px] bg-slate-100  start rounded lg:rounded-none`
                    : ('; '+document.cookie).split(`; mode=`).pop().split(';')[0] == 'darkMode' ? 
                      `lg:bg-[#031D4A] px-10 lg:px-28 tracking-[0px] bg-slate-500 z-20 rounded lg:rounded-none start end` : `lg:bg-[#031D4A] px-10 lg:px-28 tracking-[0px] bg-slate-100 z-20 rounded lg:rounded-none start end`
                    }>

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
                    { user.user_id !== null ?
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
                :  "absolute border-stone-800 border-[1px] bg-gray-100  w-full lg:w-[420px] lg:mt-10 top-[40px] lg:top-[200px] p-5 h-64 shadow-2xl z-10 rounded"
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
 