const {pool} = require('../../DB/db');
import bcrypt from 'bcrypt'

// 회원 정보 API 제공 (GET)
export async function GET(req) {
    const user = await pool.query("SELECT * FROM members");
    return new Response(JSON.stringify(user))
}  

// 회원 가입 (POST)
export async function POST(req) {   
    let body = await req.json()

    try {
        const results = await pool.query(`SELECT * FROM members WHERE user_id='${body.user_id}' `);    
        
        if(results.length == 1) {                                      // ID 중복 체크
            
            return new Response(JSON.stringify({msg: 'id_fail'}))
        } else {        
    
            let hash = await bcrypt.hash(body.password, 10)

            await pool.query(`
                INSERT INTO members(user_id, nickName ,password)
                Values
                ('${body.user_id}', '${body.nickName}', '${hash}') 
            `);
            return new Response(JSON.stringify({msg: 'success'}))
        }
    } catch (err) {

        throw err;
    } finally {

        pool.end()
    }
}