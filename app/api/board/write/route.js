const {pool} = require('../../../DB/db');


// export async function GET(req) {
//     try{
//       const rows = await pool.query("SELECT * FROM articles ORDER BY article_idx DESC");
//       let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
  
//       return new Response(JSON.stringify({ result }))
//     } catch(err) {

//     }
// }
  
export async function POST(req) {

    let body = await req.json()
    try{
        await pool.query(`
            INSERT INTO articles(board_idx, regist_userid, nickName, title, contents, regist_date)
            Values
            ('${body.board_idx}','${body.user_id}','${body.nickName}', '${body.title}', '${body.contents}', '${body.regist_date}') 
        `);         
      
        return new Response(JSON.stringify({msg: 'success'}))
    } catch(err) {
      console.log(err)
    } finally {
        pool.end()
    }
}
  