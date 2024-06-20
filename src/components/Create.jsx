import React,{useEffect, useState} from 'react'
import NavBar2 from './NavBar2'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';


const Create = (props) => {

const [quizzes, setQuizzes] = useState([])
const [quizCheck, setQuizCheck] = useState(true)
  const navigate = useNavigate();
  useEffect(()=>{
    getData()
    getQuiz()
  },[]);
  useEffect(() => {
    if (!props.user) {
      navigate('/');
    }
  }, [props.user, navigate]);
let response='';

  async function getData(){
    const result = await axios.post('http://localhost:3000/getTotalQuizzes',{id: props.user.uid});
    const response = result.data;
    setQuizCheck(response)
  }


async function getQuiz(){
  const result = await axios.post('http://localhost:3000/getAllQuizzes',{id: props.user.uid});
    const response = result.data;
    setQuizzes(response)
    console.log(quizzes)
}
  return (
    <div>
    <NavBar2 handleSignout={props.handleSignout}/>
    {quizCheck?<div className="d-flex justify-content-center align-items-center flex-column Noquiz">
      <h1>You have not created any quiz! You can Create a quiz by clicking on the button below</h1>
      <button className="btn btn-primary mt-5" onClick={()=>{
        navigate('/quizCreation')
      }}>Create a Quiz</button>
    </div>:
    <div>
    <div style={{textAlign:'center'}}>
    <button className="btn btn-primary mt-5" onClick={()=>{
        navigate('/quizCreation')
      }}>Create a Quiz</button>
      </div>
      <div className='d-flex flex-wrap'>
    {quizzes.map((quiz)=>{
      return <Card
        title={quiz.title}
        description = {quiz.description}
        img = {quiz.imageurl}
      />
    })}
    </div>
    </div>}
    
    </div>
  )
}

export default Create