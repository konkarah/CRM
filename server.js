const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const Db = require('./mydb')
const bcrypt = require('bcryptjs')
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
    const name = req.body.benData
    const id= req.body.IDNo
    const progno= req.body.ProgNo
    const prog= req.body.prog
    const sex= req.body.sex
    const phone= req.body.phone
    const compsrc= req.body.compsrc
    const casecat= req.body.casecat
    const casetype= req.body.casetype
    const desc= req.body.desc
    const mood= req.body.mood
    const status= req.body.status
    const resolution= req.body.res
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
                console.log(result)
                res.send(result)
            }
          }
    )
})

app.post('/register', async(req,res)=> {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password

    const hashedPassword = await bcrypt.hash(password, 10);

    Db.query(
        "INSERT INTO users (email, name, password) VALUES (?,?,?)",
        [email, name, hashedPassword],
        (err,result)=> {
            if(err){
                console.log(err)
                return err
            }else{
                console.log(result)
                res.send(result)
            }
        }

    )
})
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error occurred');
            } else {
                if (result.length === 0) {
                    return res.status(401).send('User not found');
                }
                const hashedPassword = result[0].password;

                try {
                    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
                    if (isPasswordMatch) {
                        res.status(200).send('Login successful');
                    } else {
                        res.status(401).send('Invalid password');
                    }
                } catch (error) {
                    console.error(error);
                    res.status(500).send('Login failed');
                }
            }
        }
    );
});

app.listen(port, () => {
  console.log(`Inua Jamii CRM app listening on port ${port}`)
})