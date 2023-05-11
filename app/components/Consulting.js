'use client'

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_LOGIN, SET_LOGOUT, SET_LOGIN_WINDOW } from "../Redux/reducers/userSlice"

export default function Consulting() {
    
    const { user} = useSelector((state) => state.user)
    
    const [login, setLogin] = useState(false)
    const [consulting, setConsulting] = useState(false)
    const [member, setMember] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [user_id, setUserId] = useState('')
    const [nickName, setNickName] = useState('')
    const [password, setPassword] = useState('')
    const [pwCheck, setPwCheck] = useState('')
    
    const dispatch = useDispatch()
    
    return <>
    <div className=" lg:mt-[50px] lg:mb-[50px] z-0">

    {/*상담 신청 & 회원 가입 */}
    <div className="flex mt-10 w-full lg:w-[980px] m-auto lg:m-auto justify-center lg:justify-start mb-10">
        <p className="shadow-lg bg-blue-600 p-2 lg:p-4 w-[104px] lg:w-[120px] mr-0 lg:mr-0 text-neutral-100 lg:text-sm cursor-pointer hover:bg-red-400" onClick={()=>{
           user.id !== null ? setConsulting(true) : alert('로그인 하시기 바랍니다.')
        }}>상담신청</p>
        { user.id == null ?
            <p className="shadow-lg bg-gray-400 p-2 lg:p-4 w-[104px] lg:w-[120px] text-white text-sm cursor-pointer hover:bg-red-400" onClick={() => {
                setMember(true)
        
            }}>회원가입</p>        
            : <p className="shadow-lg bg-gray-400 p-2 lg:p-4 w-[220px] lg:w-[220px] text-white text-sm" onClick={() => {
        
            }}>궁금한 내용이 있으신가요?</p>     
        }
  
    </div>        
    <div className="relative m-auto lg:w-[420px] ">


    {/* 상담 신청 패널 */}
    { consulting == true ? 
        <div className="absolute border-[#031D4A] border-[0px]] bg-gray-100 w-full lg:w-[420px] lg:mt-10 lg:left-[0px] top-[-348px] lg:top-[-482px] p-5 h-64 shadow-2xl z-10">
            <div className="text-center">
                {/* <span>전화번호 입력 후 확인을 눌러주세요</span><br /> */}
                <span className="text-xl font-bold">문의사항</span><br /><br />
            </div>
            <div className="lg:ml-[-10px] lg:w-96 mb-5">   
                <form>
                    <div className="relative sm:mb-0 flex-grow w-full mb-2">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600 mr-2">제목</label>
                        <input autoComplete="off" type="text" id="full-name" name="name" className="w-56 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-00 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="relative sm:mb-0 flex-grow w-full mt-2">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-900 mr-2">내용</label>
                        <input autoComplete="off" placeholder="간단히" type="text" id="name" name="telNumber" className="w-56 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setContent(e.target.value)}/>
                    </div>
                </form>
            </div>
            <div className="mt-2 ml-6 text-center">
                <button className="p-2 px-5 rounded-sm mr-2 bg-blue-500 hover:bg-blue-400 text-white" onClick={()=> {

                    if(title == '') {
                        alert('제목을 입력하세요')
                        return 
                    } else if(content == '') {
                        alert('내용을 입력하세요')
                        return
                    }
                    // fetch('http://localhost:3000/api/login', {
                    //     method: 'POST',
                    //     body: JSON.stringify({id: id, pw: pw})
                    // })
                    // .then((res) => {
                    //     return res.json();
                    // })
                    // .then(data => {
                    //     if(data.msg == 'success') {
                    //         alert('상담 결과는 Mypage에 확인할 수 있습니다. \n (3일 안에 회신')
                    //         setConsulting(false)
                    //     }
                    // })
                    alert('상담 결과는 Mypage에서 확인할 수 있습니다. (3일 이내 회신)')
                    setTitle('')
                    setContent('')
                    setConsulting(false)
                    
                }}>확인</button>
                <button className="p-2 px-5 rounded-sm bg-red-500 hover:bg-red-300 text-white" onClick={()=> setConsulting(false)}>취소</button>
            </div>
        </div> 
        : null
        }   
        </div>
        <div className="relative m-auto lg:w-[420px] ">


    {/* 회원 가입 패널 */}
    { member == true ? 
        <div className="absolute border-[#031D4A] border-[0px] bg-gray-100 w-full lg:w-[420px] lg:mt-10 lg:left-[0px] top-[-348px] lg:top-[-482px] p-5 h-180 shadow-2xl z-10">
            <div className="text-center">
                {/* <span>전화번호 입력 후 확인을 눌러주세요</span><br /> */}
                <span className="text-xl font-bold">회원가입</span><br /><br />
            </div>
            <div className="lg:ml-[-10px] lg:w-96 mb-5">   
                <form>
                    <div className="relative sm:mb-0 flex-grow w-full mb-2  ml-[2px]">
                        <label htmlFor="id" className="leading-7 text-sm text-gray-600 mr-4">ID</label>
                        <input autoComplete="off" type="text" id="id" name="id" className="w-56 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setUserId(e.target.value)} />
                    </div>
                    <div className="relative sm:mb-0 flex-grow w-full mt-2 ml-[-5px]">
                        <label htmlFor="nickName" className="leading-7 text-sm text-gray-600 mr-4">이름</label>
                        <input autoComplete="off" type="text" id="nickName" name="nickName" className="w-56 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setNickName(e.target.value)} />
                    </div>
                    <div className="relative sm:mb-0 flex-grow w-full mt-2 ml-[-14px]">
                        <label htmlFor="pw" className="leading-7 text-sm text-gray-600 mr-2">비밀번호</label>
                        <input autoComplete="off" type="password" id="pw" name="password" className="w-56 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="relative sm:mb-0 flex-grow w-full mt-2 ml-[-14px]">
                        <label htmlFor="name2" className="leading-7 text-sm text-gray-600 mr-2">비번확인</label>
                        <input autoComplete="off" type="password" id="name2" name="password2" className="w-56 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setPwCheck(e.target.value)}/>
                    </div>
                </form>
            </div>
            <div className="mt-2 ml-0 text-center">
                <button className="p-2 px-5 rounded-sm mr-2 bg-blue-500 hover:bg-blue-400 text-white" onClick={()=> {

                    if(user_id.length == 0) {                        
                        alert('ID를 입력하세요')
                        return 
                    } else if(password.length == 0) {
                        alert('비밀번호를 입력하세요')
                        return
                    } else if(password !== pwCheck) {
                        alert('비밀번호가 일치하지 않습니다.')   
                        return                                             
                    }
                    let user = {
                        user_id,
                        nickName,
                        password,
                    }
                    fetch('https://min-tax-8h5x.vercel.app/api/member', {
                        method: 'POST',
                        body: JSON.stringify(user)
                    })
                    .then((res) => {
                        return res.json();
                    })
                    .then(data => {
                        if(data.msg == 'success') {
                            alert('회원 가입이 완료되었습니다')   
                            setMember(false)                            
                        } else if(data.msg == 'id_fail') {
                            alert('이미 사용중인 아이디 입니다.')
                        }
                    })
                    
                }}>확인</button>
                <button className="p-2 px-5 rounded-sm bg-red-500 hover:bg-red-300 text-white" onClick={()=> setMember(false)}>취소</button>
            </div>
        </div> 
        : null   
        }   
        </div>
    </div>
</>
}