const router = require('express').Router();
const pool = require('../modules/pool');

router.get("/", (req, res)=>{
    let queryText = `SELECT * FROM "todos";`

    pool.query(queryText)
        .then((result)=>{
            console.log('in GET /todos resukt.rows', result.rows)
            res.send(result.rows)
        })
        .catch((error)=>{
            console.log('error in /GET router', error)
            res.sendStatus(500)
        })
})


module.exports = router;
