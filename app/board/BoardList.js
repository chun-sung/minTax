'use client'
import { useMutation, useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"             // 날짜 포맷 
import Pagination from "react-js-pagination"
import './Pagination.css';
import { useState, useEffect, useNavigate, useLocation } from "react";
import { useRouter, usePathname } from "next/navigation";
// import { useRouter } from "next/router";


export default function BoardList() {

    // 라이브러리 설정 ( react-js-pagination )
    const router = useRouter();     //  이동시 인자 값 전달               
    const pathname = usePathname()

    const [posts, setPosts] = useState([]);       // 게시글 데이터
    const [limit, setLimit] = useState(10);       // 페이지당 표시할 게시글 수
    const [page, setPage] = useState(1);// 페이지 번호
    console.log('라우터',router,pathname)

    const handlePageChange = page => {
        setPage(page);
    };
    const offset = (page - 1) * limit;           // 페이지의 시작점    


    // tanstack/react-query 
    const { isLoading, error, data, refetch, postQuery } = useQuery({
        queryKey: ['posts'],        
        queryFn: () =>  fetch('/api/board').then(res => res.json()).then( res => { 
            setPosts(res.result)
            return res.result
        }),        
    })   
    
        // useQuery 데이터 로딩중
    if(isLoading) return <div className="text-center mt-10 p-2 bg-gray-200 w-36 rounded-lg m-auto">Loading...</div>

        // useQuery 에러처리
    if(error) return <pre>{JSON.stringify(postQuery?.error)}</pre>


    return <>
        <div className="boardList__section mt-8 bg-neutral-0 p-1 lg:p-10 w-full lg:w-[1200px] m-auto">
            <div className="boardList__wrapper lg:h-[600px]">
                <div className="text-right mb-1 lg:w-[900px] m-auto">
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-700 hover:bg-blue-500 text-white rounded mr-1 mb-0 text-sm"onClick={()=>router.push('/board/create')}>작성</button>
                </div>
                <div className="text-center m-auto w-full lg:w-[900px]">
                    <table className="w-full lg:w-[900px] border-l-[1px] border-r-[1px] lg:border-0">
                        <thead className="">
                            <tr className=" text-sm lg:text-md lg:border-b border-2 bg-slate-300 h-10">
                                <th width="10%">No</th>
                                <th width="60%">제목</th>
                                <th width="15%">작성일</th>
                                <th width="15%" className="">작성자</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm lg:text-md">
                            {
                                posts?.slice(offset, offset + limit).map(({ article_idx, title, regist_date, regist_userid }, i) => {
                                    return (
                                        <tr className="border-b border-1 border-slate-200 hover:bg-gray-200" key={i} onClick={()=> {}}>
                                            <td className="p-1.5 lg:p-3">
                                                {offset + i + 1 }
                                            </td>
                                            <td className="lg:text-md hover:text-blue-500 hover:font-bold">
                                                
                                                <span className="inline-block text-[13px] lg:text-[16px] p-1 w-full cursor-pointer" onClick={()=> {
                                                    router.push(`/board/${posts[offset + i].article_idx}`,{state: {page:page}})}}>

                                                    {title} { dayjs(regist_date).format('YY.MM.DD') == dayjs().format('YY.MM.DD') 
                                                                ? <span className="relative left-[10px] bg-blue-600 text-white rounded-md text-[10px] lg:text-[12px] p-1 px-2 lg:px-4 shadow-md" >New</span> 
                                                                : null
                                                            }
                                                </span>
                                                
                                            </td >
                                            <td className="lg:text-md">
                                                <span className="text-[12px] lg:text-[16px]">{dayjs(regist_date).format("YY.MM.DD")}</span>
                                            </td>
                                            <td className="">
                                                <span className="text-[12px] lg:text-[16px]">{regist_userid}</span>
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