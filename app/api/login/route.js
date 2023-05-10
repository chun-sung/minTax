const {pool} = require('../../DB/db');
import bcrypt from 'bcrypt'

// 회원 정보 API 제공 (GET)
export async function GET(req) {
    const user = await pool.query("SELECT * FROM members");
    return new Response(JSON.stringify(user))
}

// 로그인 과정
export async function POST(req) {

    let body = await req.json()

    try {
        const rows = await pool.query(`SELECT * FROM members WHERE user_id='${body.user_id}' `);   
        let result = Object.values(JSON.parse(JSON.stringify(rows))); //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리   

        // 존재하지 않는 ID 확인
        if(result.length == 0) return new Response(JSON.stringify({msg: 'id_fail'}))

        // 존재하지 ID 확인 않하면 당연히 result[0].password 는 undefined 으로 에러가 발생한다.
        let pwcheck = await bcrypt.compare(body.password, result[0].password)          
        if(!pwcheck) return new Response(JSON.stringify({msg: 'pw_fail'}))   
        
        let data = {msg: 'success', nickName: result[0].nickName }
        return new Response(JSON.stringify(data))        

    } catch (err) {
        console.log(err)
        // throw err
    } finally {

        pool.end()
    }
}

