import React,{useEffect, useState} from 'react'
import NavBar2 from './NavBar2'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = (props) => {
  const [response, setResponse] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    getData()
  },[]);
  useEffect(() => {
    if (!props.user) {
      navigate('/');
    }
  }, [props.user, navigate]);

  async function getData(){
   const result = await axios.get('http://localhost:3000/');
  setResponse(result.data.message);
  }
  return (
    <div>
    <NavBar2 handleSignout={props.handleSignout}/>
    <div className="d-flex justify-content-center align-items-center flex-column Noquiz">
      <h1>You have not created any quiz! You can Create a quiz by clicking on the button below</h1>
      <button className="btn btn-primary mt-5" onClick={()=>{
        navigate('/quizCreation')
      }}>Create a Quiz</button>
      
    </div>
    </div>
  )
}

export default Create