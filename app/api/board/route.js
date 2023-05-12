const {pool} = require('../../DB/db');


export async function GET(req) {
    try{
      const rows = await pool.query("SELECT * FROM articles ORDER BY article_idx DESC");
      let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
  
      return new Response(JSON.stringify({ result }))
    } catch(err) {

    }
}
  
export async function POST(req) {

    let body = await req.json()
    try{
      const rows = await pool.query(`SELECT * FROM articles WHERE article_idx='${body.id}'` );
      let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
      console.log(...result)
      return new Response(JSON.stringify(...result))
    } catch(err) {
      console.log(err)
    }
}
  