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

app.post('/getTotalQuizzes',async (req,res)=>{
  const {id}=req.body
  const totalQuizz = await db.query("SELECT quiz_id from quizzes where user_id=($1)",[id]);
  res.json(totalQuizz.rows.length===0);
})

app.post('/getAllQuizzes', async(req,res)=>{
  const {id} = req.body
  const allQuizGet = await db.query("SELECT title, description, imageurl FROM quizzes where user_id=($1)",[id])
  console.log(id)
 const allQuiz = allQuizGet.rows
 console.log(allQuiz)
  res.json(allQuiz)
})

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


app.post('/sendQuiz', async(req,res)=>{
  const { ids,title,description,imageURL,allOption, allQuestion,Apple } = req.body;
  let quiz_id=""
  let question_id = ""
  try{
    await db.query("INSERT INTO quizzes(user_id, title, description, imageurl) VALUES ($1,$2,$3,$4)",[ids,title,description,imageURL])
    const quiz_idChecked = await db.query("SELECT quiz_id FROM quizzes where title=$1 AND user_id=$2",[title, ids])
    quiz_id = quiz_idChecked.rows[quiz_idChecked.rows.length-1].quiz_id
    console.log(quiz_id)
  } catch(err){
    console.log("Didnot work")
  }
  let i =0
  try{
    for(let i=0; i<=allQuestion.length;i++){
      await db.query("INSERT INTO questions(quiz_id,question_text) VALUES ($1,$2)",[quiz_id,allQuestion[i]])
      const question_idChecked = await db.query("Select question_id FROM questions where quiz_id=$1 AND question_text=$2 ",[quiz_id, allQuestion[i]])
      question_id = question_idChecked.rows[question_idChecked.rows.length-1].question_id
      await db.query("INSERT INTO options(question_id, option_text, is_correct) VALUES($1,$2,$3)",[question_id,allOption[i].firstOption,allOption[i].isFirstTrue])
      await db.query("INSERT INTO options(question_id, option_text, is_correct) VALUES($1,$2,$3)",[question_id,allOption[i].secondOption,allOption[i].isSecondTrue])
      await db.query("INSERT INTO options(question_id, option_text, is_correct) VALUES($1,$2,$3)",[question_id,allOption[i].thirdOption,allOption[i].isThirdTrue])
      await db.query("INSERT INTO options(question_id, option_text, is_correct) VALUES($1,$2,$3)",[question_id,allOption[i].fourthOption,allOption[i].isFourthTrue])
    };
  }catch(err){

  }
} )

app.post('/sendQuestOption', async(req,res)=>{
  
})

app.listen(port, ()=>{
  console.log(`Server start on port ${port}`)
})