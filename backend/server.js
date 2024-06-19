import express from "express";
import cors from "cors";
import pg from "pg";

const app = express()
app.use(cors());
app.use(express.json());
const port = 3000

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Quizzing",
  password: "Iamapro123",
  port: 5432,
});
db.connect();

app.get('/',(req,res)=> {
    res.json({ message: "HELLO MY FRIEND!" })
});

app.post('/getUser', async (req,res)=>{
  const { ids } = req.body;

  const result = await db.query("Select user_id from users where user_id=($1)",[ids])
  console.log(result.rows.length)
  try{
  if(result.rows.length===0){
      await db.query(
        "INSERT INTO users (user_id) VALUES ($1)",
        [ids]
      );
      res.status(201).send("User added");
  }else{
    console.log("User already exists")
  }}
  catch(err){
    console.log("Nothing")
  }
  
})

app.listen(port, ()=>{
  console.log(`Server start on port ${port}`)
})