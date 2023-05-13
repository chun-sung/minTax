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
    const [comment, setComment] = useState('');
    const [commentBtn, setCommentBtn] = useState(false);

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

        <div className="article__section mt-8 bg-neutral-000 p-1 lg:p-10 w-full lg:w-[1200px] m-auto">
            <div className="article__wrapper w-full lg:w-[1000px] h-[600px] lg:h-[600px] m-auto">
                <div className="text-right mb-2 w-full lg:w-[900px] m-auto">
                    <button className="shadow-md inline-block p-1 px-3 bg-gray-500 hover:bg-gray-600 text-white rounded mr-1 mb-0 text-sm" onClick={() => router.back()}>뒤로</button>
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded mr-1 mb-0 text-sm ">수정</button>
                    <button className="shadow-md inline-block p-1 px-3 bg-red-500 hover:bg-red-600 text-white rounded mr-1 mb-0 text-sm ">삭제</button>
                </div>
                <table className="w-full lg:w-[900px] border-l-[1px] border-r-[1px] m-auto">
                    <thead className="">
                        <tr className=" text-[13px] lg:text-md lg:border-b border-2 bg-slate-300 h-10">
                            <th width="15%">No.{data.article_idx}</th>
                            <th width="55%">{data?.title}</th>
                            <th width="10%">{dayjs(data?.regist_date).format("YY.MM.DD")}</th>
                            <th width="20%" className="">{data?.regist_userid}</th>
                        </tr>
                    </thead>
                    {/* <tbody className="text-sm lg:text-md">                            
                        <tr className="border-b border-1 border-slate-200" >
                            <td  colSpan='4' className="p-1.5 lg:p-3 h-96 ">
                                {data?.contents}
                            </td>          
                        </tr>                            
                    </tbody> */}
                    {/* <tbody className="text-sm lg:text-md">                             */}
                    {/* </tbody> */}
                </table>
                <div className="border-b lg:border border-1 border-slate-200 p-1 w-full lg:w-[900px] m-auto bg-zinc-50">
                    <span  colSpan='4' className="p-1.5 lg:p-3 h-96 ">
                        <br/>{data?.contents}<br/><br/>
                    </span>          
                </div>      
                  <div className="text-right mb-1 w-full lg:w-[900px] m-auto">
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-500 hover:bg-blue-600 text-white text-right rounded mt-2 mb-3 text-sm" onClick={()=>{
                      setCommentBtn(!commentBtn)
                    }}>댓글</button>
                  </div>
                <div className="relative bg-zinc-0 mt-0 py-3 w-full lg:w-[900px] m-auto">
                  <div className="text-center  text-sm mb-3">
                    <span className="inline-block bg-orange-300 p-1 lg:p-2 px-4 rounded-xl"> 혁명은 힘들어요~!</span>
                    <span className="text-[10px] lg:text-[12px] ml-2 mr-2 rounded-full bg-zinc-400 text-white py-[2px] px-2">홍길동</span>
                    <span className="text-[12px] lg:text-[12px]">04.22일</span>
                  </div>
                  <div className="text-center text-sm mb-3">
                    <span className="inline-block bg-orange-300 p-1 lg:p-2 px-4 rounded-xl"> 에이 마이크로소프트보다 구글이 더 좋은데.. 우띵 우리 다른 거해요</span>
                    <span className="text-[10px] lg:text-[12px] ml-2 mr-2 rounded-full bg-zinc-400 text-white py-[2px] px-2">이순신</span>
                    <span className="text-[10px] lg:text-[12px] ">04.20일</span>
                  </div>
                  <div className="text-center text-sm mb-3">
                    <span className="inline-block bg-orange-300  p-1 lg:p-2 px-4 rounded-xl"> 구글이 한건 할거 같아요</span>
                    <span className="text-[10px] lg:text-[12px] ml-2 mr-2 rounded-full bg-zinc-400 text-white py-[2px] px-2">구글짱</span>
                    <span className="text-[10px]  lg:text-[12px] ">04.19일</span>
                  </div>
                  <div className="text-center text-sm mb-3">
                    <span className="inline-block bg-orange-300 p-1 lg:p-2 px-4 rounded-xl">기다려 보세요!!</span>
                    <span className="text-[10px] lg:text-[12px] ml-2 mr-2 rounded-full bg-zinc-400 text-white py-[2px] px-2">빌게이츠</span>
                    <span className="text-[10px]  lg:text-[12px] ">04.16일</span>
                  </div>
                  { commentBtn == true ?
                    <div className="relative lg:absolute top-[-260px] lg:top-[-50px] left-[-28px] lg:left-[40px] z-10 bg-stone-400 p-2 shadow-md rounded-md w-[290px] lg:w-[800px] m-auto">
                      <input className="w-full p-1 rounded" onChange={(e) => setComment(e.target.value)} type="text" />
                      <div className="text-right">
                        <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white text-right rounded mt-2 mb-0 text-sm mr-2">확인</button>
                        <button className="shadow-md inline-block p-1 px-3 bg-red-400 hover:bg-red-600 text-white text-right rounded mt-2 mb-0 text-sm" onClick={()=> setCommentBtn(false)}>취소</button>
                      </div>
                    </div>
                    :null
                  }
                </div>                      

            </div>
        </div>



        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-2/3 mx-auto">
            <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
              <img alt="gallery" className="w-full object-cover h-full object-center block opacity-25 absolute inset-0" src="https://dummyimage.com/820x340"/>
              <div className="text-center relative z-10 w-full">
                <h2 className="text-2xl text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                <p className="leading-relaxed">Skateboard +1 mustache fixie paleo lumbersexual.</p>
                <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="px-2 w-1/2">
                <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative">
                  <img alt="gallery" className="w-full object-cover h-full object-center block opacity-25 absolute inset-0" src="https://dummyimage.com/542x460"/>
                  <div className="text-center relative z-10 w-full">
                    <h2 className="text-xl text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                    <p className="leading-relaxed">Skateboard +1 mustache fixie paleo lumbersexual.</p>
                    <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="px-2 w-1/2">
                <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative">
                  <img alt="gallery" className="w-full object-cover h-full object-center block opacity-25 absolute inset-0" src="https://dummyimage.com/542x420"/>
                  <div className="text-center relative z-10 w-full">
                    <h2 className="text-xl text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                    <p className="leading-relaxed">Skateboard +1 mustache fixie paleo lumbersexual.</p>
                    <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">Shooting Stars</h2>
              <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">The Catalyzer</h2>
              <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">The 400 Blows</h2>
              <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
          <button className="flex mx-auto mt-20 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        </div>
      </section>
    </>
}