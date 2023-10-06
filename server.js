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

app.post('/mycallcentre', (req,res)=> {
    const name = req.body.name
    const id= req.body.idno
    const progno= req.body.progno
    const prog= req.body.prog
    const sex= req.body.sex
    const phone= req.body.phone
    const compsrc= req.body.cpmpsrc
    const compcat= req.body.compcat
    const casetype= req.body.casetype
    const desc= req.body.desc
    const mood= req.body.mood
    const status= req.body.status
    const resolution= req.body.resolution
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})