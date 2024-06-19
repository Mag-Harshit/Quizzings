import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar2 from './NavBar2';
import axios from 'axios';


const Input = (props) => {
    
    const navigate = useNavigate();
    const [quizDetail, setQuizDetail] = useState({
      title:"",
      description:"",
      image: "./noImage.png"
    })
  useEffect(() => {
    if (!props.user) {
      navigate('/');
    }
  }, [props.user, navigate]);

  useEffect(()=>{
    getUser();
  },[])

  async function getUser(){
    console.log("Hello")
    const userId = props.user.uid;
    await axios.post('http://localhost:3000/getUser',{
      ids: userId
    });
  }

  function handleQuizDetail(event){
    const {name, value} = event.target
    setQuizDetail((prevDetail)=>{
      return {
        ...prevDetail,
        [name]:value
      }
    })
  }

  function handleImageUpload(event){
    const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setQuizDetail((prevDetail) => {
                return {
                    ...prevDetail,
                    image: imageUrl
                };
            });
        }
  }
  
  return (
    <div>
    <NavBar2 handleSignout={props.handleSignout}/>
    <div className='text-center'>
    <h1 className='mb-4 mt-4'>CREATE A QUIZ</h1>
    </div>
    <form>
    <div className='gap-5 ms-5'>
    <h4>Title</h4>
    <input value={quizDetail.title} onChange={handleQuizDetail} name='title' className='title' type='text'></input>
    </div>
    <div className='mt-5 ms-5'>
    <h4>Description</h4>
    <textarea value={quizDetail.description} onChange={handleQuizDetail} className='mb-4 description' name='description' type='text' rows={10}></textarea>
    </div>
    <div className='mt-2 ms-5'>
    <h4>Image:</h4>
    <input type="file" id="myFile" name="image" accept="image/*" onChange={handleImageUpload} />
    </div>
    <div className='d-flex flex-row-reverse '>
    <button className='btn btn-primary' style={{width:"100px", marginRight:"20px"}} disabled={quizDetail.title.length===0 || quizDetail.description.length===0}>Next</button>
    </div>
    </form>
    </div>
    
  )
}

export default Input