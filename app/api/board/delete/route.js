const {pool} = require('../../../DB/db');

console.log('hell-1')
export async function POST(req) {      
   console.log('hell-2')
   let body = await req.json()
   console.log('hell-3')
   
      console.log(body)

    try{
      const rows = await pool.query(`DELETE FROM articles WHERE article_idx='${body.article_idx}'` );
      let result = Object.values(JSON.parse(JSON.stringify(rows)));             //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
      console.log('결과',rows)
      
      return new Response(JSON.stringify({msg: 'success'}))
    } catch(err) {
      console.log(err)
    }
}
  