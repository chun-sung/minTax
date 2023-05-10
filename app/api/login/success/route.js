const {pool} = require('../../../DB/db');

// 회원 정보 API 제공 (GET)
export async function GET(request) {
    // const user = await pool.query("SELECT * FROM members");
    // return new Response(JSON.stringify({mag: 'ok'}))
    console.log('hello')
}

// 로그인 과정
// export async function POST(req) {
    
//     let body = await req.json()

//     const rows = await pool.query(`SELECT * FROM members WHERE user_id='${body.user_id}' `);
    
//     let result = Object.values(JSON.parse(JSON.stringify(rows))); //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리
    
//     console.log('결과1',result)
    
//     if(result.length == 0){
//         console.log('결과2',result)
//         return new Response(JSON.stringify({msg: 'id_fail'}))
//     } 
//     if(result[0].password !== body.password) {
//         console.log('결과3',result[0])
//         return new Response(JSON.stringify({msg: 'pw_fail'}))        
//     }
//     let data = {msg: 'success', id: result[0].user_id }
//     pool.end()
//     return new Response(JSON.stringify(data))        
// }
















// 로그인 검증 (토큰 확인)
// loginSuccess: async (req, res, next) => {

//     try {
//             let JWT_ACCESS_SECRET='dlksjfljlsjdlfj'            
//             const token = req.cookies.accessToken;
//             const data = jwt.verify(token, JWT_ACCESS_SECRET);
//             console.log('데이터',data);
//             // 위 토큰 검증 실패하면 아래 코드 실행 안됨
//             let result = await db.Member.findOne({ 
//                 raw: true,
//                 where: { user_id: data.user_id } 
//         });
//             // async 비동기로 인해 아래 코드는 적용이 안됨
//                 // result.msg = '성공';
//             let { password, ...others } = result;

//             let result2 = {msg:'성공', ...others}
//             // 여기서 패스워드 빼줘야 할 듯

//             if(data.user_id === result.user_id) {
//                 // res.json({msg: '성공'});
//                 // console.log(result2)

//                 res.json(result2);     
//                 // res.status(200).json(result)
//         } 
//             // else {
//             //     res.json({msg:'실패'})
//             // }
//             // else 문은 필요하지 않다. jwt토큰이 맞지 않으면 에러 발생한다.
//             return 

//     } catch (error) {
//         res.status(500).json(error);    
//     }           
// }