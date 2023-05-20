'use client'
import { useMutation, useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"             // 날짜 포맷 
import Pagination from "react-js-pagination"
import './Pagination.css';
import { useState, useEffect, useNavigate, useLocation } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import PageTop from "../components/PageTop";
// import { useRouter } from "next/router";


export default function BoardList() {

    const user = useSelector(state => state.user.user)
    
    // 라이브러리 설정 ( react-js-pagination )
    const router = useRouter();              //  이동시 인자 값 전달 (nextjs v13 에서 안됨ㅠㅠ)              
   
        let urlStr
        typeof window !== 'undefined' ? urlStr = window.location.href : null
        let url = new URL(urlStr);
        let urlparams = url.searchParams;
        let pageNumber = urlparams.get('page');
    
    
    const [posts, setPosts] = useState([]);       // 게시글 데이터
    const [limit, setLimit] = useState(10);       // 페이지당 표시할 게시글 수
    const [page, setPage] = useState(pageNumber == null  ?  1 : parseInt(pageNumber)); // 페이지 번호
    
    // console.log(  urlparams?.get('page'))

    const handlePageChange = page => {
        setPage(page);
    };
    const offset = (page - 1) * limit;           // 오프셋 - 페이지 안의 게시글의 시작점    
    // console.log('오프셋', typeof offset)              // 0, 10, 20 (페이지 마다 10씩 증가 (1페이지에 10개 보여줄 때))

    // tanstack/react-query 1 게시글 불러오는 쿼리
    const { isLoading, error, data, postQuery } = useQuery({
        queryKey: ['posts'],        
        queryFn: () =>  fetch('/api/board').then(res => res.json()).then( res => { 
            setPosts(res.result)            
            return res.result
        }),        
    })
  
    // useQuery 데이터 로딩중
    if(isLoading) return <div className="text-center mt-10 p-2 bg-red-400 text-white w-36 rounded-lg m-auto">Loading...</div>

        // useQuery 에러처리
    if(error) return <pre>{JSON.stringify(postQuery?.error)}</pre>


    return <>
        <div className="boardList__section mt-8 bg-neutral-00 p-1 lg:p-10 w-full lg:w-[1200px] m-auto stop-dragging">
            {/* <PageTop /> */}
            <div className="boardList__wrapper min-h-[500px] lg:h-[600px]">
                <div className="text-right mb-1 lg:w-[900px] m-auto">
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white rounded mr-1 mb-1 text-sm stop-dragging"onClick={()=>{

                        user?.user_id == null ? alert('로그인 부탁드립니다') : router.push('/board/create')

                    }}>작성</button>
                </div>
                <div className="text-center m-auto w-full lg:w-[900px">
                    <table className="w-full h-full lg:w-[900px] border-l-[1px] border-r-[1px] lg:border-0 m-auto">
                        <thead className="">
                            <tr className="text-sm  lg:text-[16px] lg:border-b border-2 bg-slate-300 h-10">
                                <th width="10%">No</th>
                                <th width="60%">제목</th>
                                <th width="15%">날짜</th>
                                <th width="15%">이름</th>
                            </tr>
                        </thead>  
                        <tbody className="text-sm lg:text-[16px]">
                            
                            {
                                posts?.slice(offset, offset + limit).map(({ article_idx, title, regist_date, nickName, comment_length}, i) => {
                                    return (
                                        <tr className="border-b border-1 border-slate-200 hover:bg-gray-50" key={i} onClick={()=> {}}>
                                            <td className="p-1.5 lg:p-3">
                                                {offset + i + 1 }
                                            </td>
                                            <td className="lg:text-md hover:text-blue-500 hover:font-bold">
                                                <span className="relative inline-block text-left text-[15px] lg:text-[16px] p-1 w-full cursor-pointer" onClick={()=> {
                                                    router.push(`/board/${article_idx}?page=${page}`,{state: {page:page}}, {article_idx: article_idx})}}>
                                                    {title} { comment_length == null  ? null :<b className="top-[2px] text-sm text-blue-500">({comment_length})</b> } { dayjs(regist_date).format('YY.MM.DD') == dayjs().format('YY.MM.DD') 
                                                                ? <span className=" bottom-[4px] lg:bottom-[-1px] left-[-25px] lg:right-[50px] bg-red-500 text-white rounded-2xl text-right font-bold text-[10px] lg:text-[12px] lg:p-0.5 p-1 lg:px-2 shadow-md" >New</span> 
                                                                : null
                                                            }
                                                </span>                                                
                                            </td >
                                            <td className="lg:text-md">
                                                <span className="text-[12px] lg:text-[16px]">{dayjs(regist_date).format("YY.MM.DD")}</span>
                                            </td>
                                            <td className="">
                                                <span className="text-[12px] lg:text-[16px]">{nickName}</span>
                                            </td>
                                        </tr>
                                )})
                            }
                            
                        </tbody>
                    </table>
            </div>
                <p className="mt-3 mb-10 text-center"> {page} <span>Page</span></p>
                 </div>
                 <Pagination
                    activePage={page}
                    itemsCountPerPage={limit}
                    totalItemsCount={posts.length}
                    pageRangeDisplayed={7}       // 보여줄 페이지 개수            
                    prevPageText="‹"
                    nextPageText="›"            
                    onChange={handlePageChange}
                />
        </div>    
    </>
}