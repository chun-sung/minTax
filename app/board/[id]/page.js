'use client'
import PageTop from "@/app/components/PageTop";
import Seo from "@/app/components/Seo";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs"             // 날짜 포맷 

export default function Detail() {

    const [data, setData] = useState({});

    let id = useParams();
    const router = useRouter();
    
    useEffect(()=> {
        axios({
            method: 'POST',
            url: '/api/board', 
            data: id
        })
        .then( res => {         
            setData(res.data)
        })
    },[])

    return <>
        <Seo title='MinTax 게시판 | MinTAX'/>
        <PageTop />
        <h1 className="text-center mt-10 text-2xl">게시글</h1>

        <div className="article__section mt-8 bg-neutral-50 p-1 lg:p-10 w-full lg:w-[1200px] m-auto">
            <div className="article__wrapper w-full lg:w-[1000px] h-[600px] lg:h-[600px] m-auto">
                <div className="text-right mb-1 w-full lg:w-[800px] m-auto">
                    <button className="shadow-md inline-block p-1 px-3 bg-gray-700 hover:bg-gray-500 text-white rounded mr-1 mb-0 text-sm" onClick={() => router.back()}>back</button>
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-700 hover:bg-blue-500 text-white rounded mr-1 mb-0 text-sm ">수정</button>
                    <button className="shadow-md inline-block p-1 px-3 bg-red-700 hover:bg-red-500 text-white rounded mr-1 mb-0 text-sm ">삭제</button>
                </div>
                <table className="w-full lg:w-[800px] border-l-[1px] border-r-[1px] m-auto">
                    <thead className="">
                        <tr className=" text-[13px] lg:text-md lg:border-b border-2 bg-slate-300 h-10">
                            <th width="15%">No.{data.article_idx}</th>
                            <th width="55%">{data?.title}</th>
                            <th width="10%">{dayjs(data?.regist_date).format("YY.MM.DD")}</th>
                            <th width="20%" className="">{data?.regist_userid}</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm lg:text-md">                            
                        <tr className="border-b border-1 border-slate-200" >
                            <td  colSpan='4' className="p-1.5 lg:p-3 h-96 ">
                                {data?.contents}
                            </td>          
                        </tr>                            
                    </tbody>
                </table>
            </div>
        </div>
    </>
}