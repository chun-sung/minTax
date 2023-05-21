const { pool } = require('../../app/DB/db');

export default async function handler(req, res) {
   const { article_idx } = req.query;   

   try{
      const rows = await pool.query(`
      SELECT p.*, c.*
      FROM articles p
      LEFT JOIN comments c ON p.article_idx = c.article_idx_comment
      WHERE p.article_idx = '${article_idx}'`);
      
      let result = Object.values(JSON.parse(JSON.stringify(rows)));        //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
      // console.log(result)
      res.json(result)
      return;

   } catch(err) {
      console.log(err)
   } finally {
      pool.end()
  }       
}