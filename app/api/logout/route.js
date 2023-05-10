import { cookies } from 'next/dist/client/components/headers';

// 로그아웃 (accessToken 초기화)
export async function POST(req) {

    try {
        cookies().set('accessToken','' )    
        return new Response(JSON.stringify({ msg:'success'}))
        
    } catch (err) {
        console.log(err)
    }           
}


