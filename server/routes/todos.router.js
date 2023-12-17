const router = require('express').Router();
const pool = require('../modules/pool');

router.get("/", (req, res)=>{
    let queryText = `SELECT * FROM "todos";`

    pool.query(queryText)
        .then((result)=>{
            // console.log('in GET /todos result.rows', result.rows)
            res.send(result.rows)
        })
        .catch((error)=>{
            console.log('error in /GET router', error)
            res.sendStatus(500)
        })
})

router.post("/", (req, res)=>{
    let queryText = ` 
    INSERT INTO "todos" ("text") VALUES ($1);
    `
    let queryParams = [req.body.text]
    // console.log('req.body', req.body)

    pool.query(queryText, queryParams)
        .then((result)=>{
            // console.log('in POST /todos')
            res.sendStatus(201)
        })
        .catch((error)=>{
            console.log('error in /POST router', error)
            res.sendStatus(500)
        })
})

router.put("/:id", (req, res)=>{
    let queryText = ` 
    UPDATE "todos" SET "isComplete" = true WHERE "id"=$1;
    `
    let queryParams = [req.params.id]
    // console.log('req.params.id', req.params.id)

    pool.query(queryText, queryParams)
        .then((result)=>{
            // console.log('in PUT /todos')
            res.sendStatus(201)
        })
        .catch((error)=>{
            console.log('error in /PUT router', error)
            res.sendStatus(500)
        })
})

router.delete("/:id", (req, res)=>{
    let queryText = ` 
    DELETE FROM "todos" WHERE "id" = $1;
    `
    let queryParams = [req.params.id]
    // console.log('req.params.id', req.params.id)

    pool.query(queryText, queryParams)
        .then((result)=>{
            // console.log('in DELETE /todos')
            res.sendStatus(200)
        })
        .catch((error)=>{
            console.log('error in /DELETE router', error)
            res.sendStatus(500)
        })
})


module.exports = router;
