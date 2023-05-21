const {pool} = require('../../../DB/db');

export async function POST(req) {      

   let body = await req.json()

    try{
      const rows = await pool.query(`DELETE FROM articles WHERE article_idx='${body.article_idx}'` );

      // console.log('결과',rows)

      if(rows.affectedRows == 1) {
        console.log('게시글 1건 삭제 완료')
        return new Response(JSON.stringify({msg: 'success'}))
      }
    } catch(err) {
      console.log(err)
    } finally {
      pool.end()
  }
}
  