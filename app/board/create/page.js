'use client'
import PageTop from "@/app/components/PageTop";
import Seo from "@/app/components/Seo";
import { useRouter } from "next/navigation";

export default function Create() {

    const router = useRouter()
    return <>
        <Seo title='MinTax 게시판 | MinTAX'/>
        <PageTop />
        <h1 className="text-center mt-10 text-2xl">글작성</h1>

        <div className="article__section mt-8 bg-neutral-00 p-1 lg:p-10 w-full lg:w-[1200px] m-auto">
            <div className="article__wrapper w-full lg:w-[1000px] h-[600px] lg:h-[600px] m-auto">
                <div className="text-right mb-1 w-full lg:w-[800px] m-auto">
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-700 hover:bg-blue-500 text-white rounded mr-1 mb-0 text-sm ">등록</button>
                    <button className="shadow-md inline-block p-1 px-3 bg-gray-700 hover:bg-gray-500 text-white rounded mr-1 mb-0 text-sm" onClick={()=> router.back()}>Back</button>
                </div>
                <table className="w-full lg:w-[800px] border-l-[1px] border-r-[1px] m-auto">
                                <thead className="">
                                    <tr className=" text-[13px] lg:text-md lg:border-b border-2 bg-slate-300 h-10">
                                        <th width="30%">작성일: 23-01-01</th>
                                        <th width="20%"></th>
                                        <th width="20%"></th>
                                        <th width="30%" className="">작성자: 홍길동</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm lg:text-md">                            
                                    <tr className="border-b border-1 border-slate-200" >
                                        <td  colSpan='4' className="p-1.5 lg:p-3 h-96 ">
                                            <div className="relative mb-4">
                                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">제목</label>
                                                <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                            </div>                                        
                                            <div className="relative mb-4">
                                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">내용</label>
                                                <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                            </div>                                          
                                        </td>          
                                    </tr>                            
                                </tbody>
                </table>             
                </div>
        </div>
    </>
}