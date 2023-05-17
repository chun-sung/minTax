
// 미들웨어 - 서버 API 실행이나 페이지 로드가 되기 전에 여기 코드가 실행됩니다.

// headers 에는 유저가 쓰는 브라우저, 언어, OS 정보 등이 들어있습니다.
// headers, cookies 하나 출력은 .get('항목이름') 뒤에 붙입시다. Map 자료형이라 그렇습니다. 
// new NextResponse 를 잘 쓰면 유저를 별일 없이 통과시켜주거나 다른 곳으로 이동시킬 수 있습니다. 
// rewrite()는 다른 페이지 이동인데 브라우저 주소창에 뜨는 URL을 변경하지 않고 이동해줌 

// export async function middleware(req) {
   //    // console.log(req.nextUrl)
   //    // console.log(req.cookies)
   //    // console.log(req.headers)
   //    // new NextResponse.next()      // 통과
   //    // new NextResponse.redirect()  // 다른 페이지 이동
   //    // new NextResponse.rewrite()   // 다른 페이지 이동
   // }
   


// 로그인 않한 유저 메인 화면으로 돌려 보내기 (JWT 토큰 미보유시)

// edge runtime 환경에서 NodeJS 전역 모드를 지원하지 않음 (verify 검증시 오류 발생 / 사용불가)
//import jwt from 'jsonwebtoken';    (import 시 build 에서 에러 발생함- 컴파일 실패)                    
import { NextResponse } from "next/server";

export async function middleware(req) {
   
   if(req.nextUrl.pathname.startsWith('/mypage')) {               //  /mypage  경로에 접근 시 실행 됨
      // console.log(new Date().toLocaleString())                 //   2023. 5. 16. 오후 5:07:35
      // console.log(req.headers.get('sec-ch-ua-platform'))       //  "Android"
      // console.log(req.cookies)                                 //   쿠기 정보 수신

      try {         
            const token = req.cookies.get('accessToken')
            // console.log(token)                                 // { name: 'accessToken', value: 'eyJhbGciOiJIUzI1Ng0Pf6Q2TNsFMBohEjc3Q_Y28g' }

            if(token?.value == undefined) {
               return NextResponse.redirect(new URL('/', req.url))     // 토큰 값이 undefined 일때 로그인 페이지로 리다이렉션(메인 페이지)
            } else if(token?.value == ''){
               return NextResponse.redirect(new URL('/', req.url))     // 토큰 값이 '' - 로그인 페이지로 리다이렉션(메인 페이지)
            }
            return   
         } catch (err) {
            console.log(err)
      }         
      return NextResponse.next()
   }     
}