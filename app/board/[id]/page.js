'use client'
import PageTop from "@/app/components/PageTop";
import Seo from "@/app/components/Seo";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs"             // 날짜 포맷 
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
 
export default function Detail() {

   const user = useSelector(state => state.user.user)

    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [commentBtn, setCommentBtn] = useState(false);

    let id = useParams();
    let router = useRouter();
    
  
    // console.log(window.location)

    let urlStr = window.location.href
    let url = new URL(urlStr);
    let urlparams = url.searchParams;
    let pageNumber = urlparams.get('page');


       // tanstack/react-query 1            
    // const { isLoading, error, data, postQuery } = useQuery({
    //   queryKey: ['article'],        
    //   queryFn: () =>  fetch(`/api/board`,{
    //     method: 'POST',
    //     body: JSON.stringify({id: id.id})

    //   }).then(res => res.json()).then( res => { 
    //     // console.log('게시글 1건',res)
    //     setArticle(res)        
    //     return res
    //   }),
    // })      

    
    // const info = article?.article_idx  // 종속 변수 1


    // // tanstack/react-query 2  (종속 쿼리)     
    // let { refetch } = useQuery({   

    //   queryKey:['comment'],
    //   queryFn: () =>  fetch(`/api/comments?article_idx=${article.article_idx}`).then(res => res.json()).then( res => { 
    //     // console.log('댓글리스트',res)
    //     setComments(res)
    //     console.log(res);
    //     return res
    //   }),
    //   enabled: !!info       // info 에 데이터가 존재해야 쿼리됨
    // })
    


    // tanstack/react-query 3            
    const { isLoading, error, data, postQuery, refetch } = useQuery({
      queryKey: ['article'],        
      queryFn: () =>  fetch(`/api/comments?article_idx=${id.id}`)
      .then(res => res.json()).then( res => { 
        // console.log(res)
        setArticle(res)        
        return res
      }),
    })          


    // useQuery 데이터 로딩중 (여기서 사용하면 안됨)
    // if(isLoading) return <div className="text-center mt-10 p-2 bg-red-200 text-white w-36 rounded-lg m-auto">Loading...</div>
    
    // useQuery 에러처리
    if(error) return <pre>{JSON.stringify(postQuery?.error)}</pre>

    return <>
        <Seo title='MinTax 게시판 | MinTAX'/>
        {/* <PageTop /> */}
        <div className="text-center h-[32px] mt-10 text-2xl stop-dragging">
          <h1 className="">{article[0]?.title}</h1>
        </div>

      {/* 게시글 출력창 */}
        <div className="article__section mt-8 bg-neutral-000 p-1 lg:p-10 w-full lg:w-[1200px] m-auto">
            <div className="article__wrapper w-full lg:w-[1000px] h-full lg:h-full m-auto">
                <div className="text-right mb-2 w-full lg:w-[900px] m-auto stop-dragging">
                    {/* <button className="shadow-md inline-block p-1 px-3 bg-gray-400 hover:bg-gray-600 text-white rounded mr-1 mb-0 text-sm" onClick={() => router.back()}>뒤로</button> */}
                    <button className="shadow-md inline-block p-1 px-3 bg-gray-400 hover:bg-gray-600 text-white rounded mr-1 mb-0 text-sm" onClick={() => router.push(`/board?page=${pageNumber}`)}>뒤로</button>
                     { user.user_id == article[0]?.regist_userid ?
                     <> 
                       <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white rounded mr-1 mb-0 text-sm" onClick={()=> { 
     
                        user?.user_id == null ? alert('로그인 부탁드립니다') : router.push(`/board/edit/${id.id}?page=${pageNumber}`)
     
                       }}>수정</button>
                       <button className="shadow-md inline-block p-1 px-3 bg-red-400 hover:bg-red-600 text-white rounded mr-1 mb-0 text-sm" onClick={()=> {
     
                        if(user.user_id == null) {
                           alert('로그인 부탁드립니다')
                           return;
                        } 
                        if(confirm('삭제 하시겠습니까?')) {
                           fetch('/api/board/delete',{
                              method: 'POST',
                              body: JSON.stringify({article_idx: article[0]?.article_idx })
                           })
                           .then(res => { return res.json()})                     
                           .then(res => {
                              if(res.msg == 'success') {
                                 router.push(`/board?page=${pageNumber}`)
                              }
                           }).catch(err => console.log(err))
                        }     
                       }} >삭제</button>                       
                     </>
                     :<> 
                        <button className="shadow-md inline-block p-1 px-3 bg-blue-200 hover:bg-blue-200 text-white rounded mr-1 mb-0 text-sm">수정</button>
                        <button className="shadow-md inline-block p-1 px-3 bg-red-200 hover:bg-red-200 text-white rounded mr-1 mb-0 text-sm">삭제</button>                       
                     </>
                     }
                </div>

              {/* 게시글 정보 */}
                <table className="w-full lg:w-[900px] border-l-[1px] border-r-[1px] m-auto">
                    <thead className="">
                        <tr className=" text-[13px] lg:text-md lg:border-b border-2 bg-slate-300 h-10">
                            <th width="20%">No.{article[0]?.article_idx}</th>
                            <th width="40%"></th>
                            <th width="20%">{dayjs(article[0]?.regist_date).format("YY.MM.DD")}</th>
                            <th width="30%" className="">{article[0]?.nickName}</th>
                        </tr>
                    </thead>
                </table>
                <div className="border-b lg:border border-1 border-slate-200 p-1 w-full lg:w-[900px] m-auto bg-zinc-100">
                    <span  colSpan='4' className="p-1.5 lg:p-3 h-96 text-lg">
                        <br/>{article[0]?.contents}<br/><br/>
                    </span>          
                </div>      
                
              {/* 댓글 입력 버튼 */}

                  <div className="text-right mb-1 w-full lg:w-[900px] m-auto stop-dragging">
                    <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white text-right rounded mt-2 mb-3 text-sm" onClick={()=>{
                      user.user_id == null ? alert('로그인 부탁드립니다.') 
                      : setCommentBtn(true)
                    }}>댓글</button>
                  </div>


                <div className="relative bg-zinc-0 mt-0 py-0 w-full lg:w-[900px] m-auto">

                  {/* 댓글 입력 패널 */}

                  { commentBtn == true ?
                    <div className="absolute lg:absolute top-[-48px] lg:top-[-48px] lg:left-[40px] z-20 bg-gray-300 border-[1px] border-gray-300 p-1 shadow-md rounded-md w-full lg:w-[800px] m-auto">
                      <input className="w-full pl-1 h-[3em] lg:h-[3em] leading-[3em] lg:leading-[3em] rounded border border-indigo-400 outline-indigo-400 bg-gray-100 text-[16px] lg:text-[18px]" onChange={(e) => setComment(e.target.value)} type="text" />
                      <div className="text-right">
                        <button className="shadow-md inline-block p-1 px-3 bg-blue-400 hover:bg-blue-600 text-white text-right rounded mt-2 mb-0 text-sm mr-2" onClick={()=> {

                          if(comment.length == '' ) return alert('댓글을 입력하세요')

                          let commentData = { comment, nickName_comment: user.nickName,
                                              regist_userid_comment: user.user_id,
                                              article_idx_comment: article[0].article_idx,
                                              regist_date_comment: dayjs(Date.now()).format('YYYY.MM.DD HH:mm.ss')
                          }
                          fetch('/api/board/comments', {
                            method: 'POST',
                            body: JSON.stringify(commentData)
                          })
                          .then(res => {
                            return res.json()
                          })
                          .then(res => {

                            if(res.msg == 'success'){
                              refetch();
                              setCommentBtn(false)
                              setComment('')
                            } else {
                              alert('등록에 실패하였습니다.')
                            }
                          }).catch(err => console.log(err))

                        }}>확인</button>
                        <button className="shadow-md inline-block p-1 px-3 bg-red-400 hover:bg-red-600 text-white text-right rounded mt-2 mb-0 text-sm" onClick={()=> { 
                          setComment('')
                          setCommentBtn(false)}}>취소</button>
                      </div>
                    </div>
                    :null
                  }
                </div>
            </div>

            {/* isLoading */}
            {
              isLoading == true ? <div className="text-center mt-0 p-2 bg-red-400 text-white w-36 rounded-lg m-auto">Loading...</div> : null
            }

            {/* 댓글 출력창  */}

            { article[0]?.comment_idx !==  null 

              ? article.map(( item, i) => {                     
                  return <div className="text-center mb-2 text-sm bg-orange-000 w-full lg:w-[900px] m-auto stop-dragging" key={i}>
                            <span className="inline-block bg-zinc-300 p-0.5 lg:p-1 px-3 lg:px-4 rounded-xl">{item.comment}</span>
                            <span className="text-[12px] lg:text-[12px] ml-2 mr-2 rounded-full bg-indigo-400 text-white py-[1px] px-2 pb-0.5 leading-[10%]">{item.nickName_comment}</span>
                            <span className="text-[12px] lg:text-[12px]">{dayjs(item.regist_date_comment).format('YY.MM.DD')}</span>
                            { user.user_id == item.regist_userid_comment
                             ? <span className="hover:bg-red-500 ml-2 w-[15px] h-[15px] inline-block text-[12px] text-white lg:text-[12px] leading-[40%] bg-red-300 rounded-full p-1 cursor-pointer" onClick={()=>{
  
                              confirm(`"${item.comment}" \n댓글을 삭제하시려구요?`) 
                              ? fetch('/api/board/comments/delete',{
                                method: 'POST',
                                body: JSON.stringify({ comment_idx: item.comment_idx })
                              })
                              .then(res => res.json())
                              .then(res => { 
                                refetch();
                                // if(res.msg == 'success') return console.log('댓글 1건 삭제 되었습니다.')                       
                              }).catch(err => console.log(err))
                              
                              : null
                              }}>x</span>
                              : <span className="hover:bg-red-500 ml-2 w-[15px] h-[15px] inline-block text-[12px] lg:text-[12px] leading-[90%] text-black hover:text-white bg-white border-[1px] border-blue-200 rounded-full p-0 cursor-pointer" onClick={()=> alert('내가 쓴 댓글만 삭제할 수 있어요!')}>x</span>
                            }
                        </div>
                })                  
              : <span className="block w-60 text-center text-gray-400 bg-gray-200 m-auto rounded-full p-1 mt-3 mb-3">댓글이 없습니다</span>
            }
      </div>

        <section className="text-gray-600 body-font my-20">
        <div className="container px-5 py-0 mx-auto flex flex-wrap">
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