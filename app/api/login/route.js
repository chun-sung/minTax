const {pool} = require('../../DB/db');
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/dist/client/components/headers';

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
        
        // JWT 처리
        let JWT_ACCESS_SECRET='springstar74'
        let JWT_RFRESH_SECRET='coonjin74'

        const userJsonData = { nickName: result[0].nickName, user_id: result[0].user_id }	

        const token = jwt.sign(userJsonData, JWT_ACCESS_SECRET, {
            expiresIn: '5h',                  // 2400h(100일) 60m, 10s, 24h
            issuer: 'springStar',
        });
        
        const refreshToken = jwt.sign(userJsonData, JWT_RFRESH_SECRET, {
            expiresIn: '12h',                 // 2400h(100일) 60m, 10s, 24h
            issuer: 'springStar',
        });            

        let data = { 
            msg: 'success', 
            jwttoken: token, 
            nickName: result[0].nickName, 
            user_id: result[0].user_id,                 
        }
        cookies().set('accessToken', token, {
            secure: false,
            httpOnly:false
        })
        cookies().set('refreshToken', refreshToken, {
            secure: false,
            httpOnly:false
        })
        return new Response(JSON.stringify(data))        

    } catch (err) {
        console.log(err)
        // throw err
    } finally {

        pool.end()
    }
}

