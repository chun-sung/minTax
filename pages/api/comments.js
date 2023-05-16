const { pool } = require('../../app/DB/db');

export default async function handler(req, res) {
   const { article_idx } = req.query;   

   try{
      const rows = await pool.query(`SELECT * FROM comments WHERE article_idx='${article_idx}'`);
      
      let result = Object.values(JSON.parse(JSON.stringify(rows)));        //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리 
      res.json(result)
      return;

   } catch(err) {
      console.log(err)
   }       
}