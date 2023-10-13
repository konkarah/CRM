const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const Db = require('./mydb')
const app = express()
const port = 3001

//middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/mycallcentreUI', (req,res)=> {
    const id = req.body.id
    Db.query(
        "SELECT * FROM ctovcmysql WHERE PrimaryRecipientNationalIDNo = ? OR ProgrammeNo = ?",
        [id,id],
        (err, result) => {
            if(err){
                console.log(err)
                return err
            }else{
                res.send(result)
            }
          }
    )
})

app.post('/mycallcentre', (req,res)=> {
    const name = req.body.name
    const id= req.body.idno
    const progno= req.body.progno
    const prog= req.body.prog
    const sex= req.body.sex
    const phone= req.body.phone
    const compsrc= req.body.compsrc
    const casecat= req.body.compcat
    const casetype= req.body.casetype
    const desc= req.body.desc
    const mood= req.body.mood
    const status= req.body.status
    const resolution= req.body.resolution
    const logger = "test"
    const date_now = new Date()
    const date = ("0" + date_now.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_now.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_now.getFullYear();

    const mydate = date +"-"+month+"-"+year
    Db.query(
        "INSERT INTO CALLCENTRECASES(name, idno, progno, prog, sex, phone, compsrc, casecat, casetype, descr, mood, status, resolution, logger, mydate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [name, id, progno, prog, sex, phone, compsrc, casecat, casetype, desc, mood, status, resolution, logger, mydate],
        (err, result) => {
            if(err){
                console.log(err)
                return err
            }else{
                res.send(result)
            }
          }
    )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})