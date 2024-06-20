import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Questions = (props) => {
  const   navigate = useNavigate()
const [options, setOptions] = useState({
    firstOption:'',
    secondOption:'',
    thirdOption:'',
    fourthOption:'',
    isFirstTrue: false,
    isSecondTrue: false,
    isThirdTrue: false,
    isFourthTrue: false
})
const[question, setQuestion] = useState('')
const [allOptions, setAllOptions] = useState([])
const [allQuestions, setAllQuestions] = useState([])
const [questionNumber, setQuestionNumber] = useState(1)

function handleOption(event){
    const {name,value}= event.target
    setOptions((prevOptions)=>{
        return{
            ...prevOptions,
            [name]:value
        }
    })
}

function handleOptionQuestion(){
    setAllOptions((prevOptions)=>{
        return[...prevOptions, options]
    })

    setAllQuestions((prevQuestions)=>{
        return [...prevQuestions, question]
    })

    setOptions({
        firstOption:'',
    secondOption:'',
    thirdOption:'',
    fourthOption:'',
    isFirstTrue: false,
    isSecondTrue: false,
    isThirdTrue: false,
    isFourthTrue: false
    })
    setQuestionNumber(questionNumber+1)

    setQuestion('')

}

function handleFinishedQuiz(){
    console.log(allQuestions)
        props.handleSendData(allOptions, allQuestions)
        navigate('/create')
}


  return (
    <div>
        <form className='d-flex align-items-center flex-column'>
        <h4>Question {questionNumber}</h4>
        <input value={question} onChange={(event)=>{
            setQuestion(event.target.value)
        }} type="text" className='title'></input>
        <h4 className='mt-5'>Options</h4>
        <div className='d-flex align-items-center'>
        <label for="firstOption">A.</label>
        <input value={options.firstOption} onChange={handleOption} name="firstOption" type="text" className='title ms-3 my-2 firstOption'></input>
        <div class="form-check">
        <input class="form-check-input ms-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={options.isFirstTrue} onClick={()=>{
            setOptions((prevOption)=>{
                return{
                    ...prevOption,
                    isFirstTrue: true,
    isSecondTrue: false,
    isThirdTrue: false,
    isFourthTrue: false
                }
            })
        }}/>
        </div>
        </div>
        <div className='d-flex align-items-center'>
        <label for="secondOption">B.</label>
        <input value={options.secondOption} onChange={handleOption} name="secondOption"type="text" className='title ms-3 my-2 secondOption'></input>
        <div class="form-check">
        <input class="form-check-input ms-1" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={options.isSecondTrue} onClick={()=>{
            setOptions((prevOption)=>{
                return{
                    ...prevOption,
                    isFirstTrue: false,
    isSecondTrue: true,
    isThirdTrue: false,
    isFourthTrue: false
                }
            })
        }}/>
        </div>
        </div>
        <div className='d-flex align-items-center'>
        <label for="thirdOption">C.</label>
        <input value={options.thirdOption} onChange={handleOption} name="thirdOption"type="text" className='title ms-3 my-2 thirdOption'></input>
        <div class="form-check">
        <input class="form-check-input ms-1" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked={options.isThirdTrue} onClick={()=>{
            setOptions((prevOption)=>{
                return{
                    ...prevOption,
                    isFirstTrue: false,
    isSecondTrue: false,
    isThirdTrue: true,
    isFourthTrue: false
                }
            })
        }}/>
        </div>
        </div>
        <div className='d-flex align-items-center'>
        <label for="fourthOption">D.</label>
        <input value={options.fourthOption} onChange={handleOption} name='fourthOption' type="text" className='title ms-3 my-2 fourthOption' ></input>
        <div class="form-check">
        <input class="form-check-input ms-1" type="radio" name="flexRadioDefault" id="flexRadioDefault4" checked={options.isFourthTrue} onClick={()=>{
            setOptions((prevOption)=>{
                return{
                    ...prevOption,
                    isFirstTrue: false,
    isSecondTrue: false,
    isThirdTrue: false,
    isFourthTrue: true
                }
            })
        }}/>
        </div>
        </div>
        <button className='btn btn-primary mt-5' style={{maxWidth:"150px", minHeight:"40px"}} onClick={handleOptionQuestion} disabled={question.length===0 || options.firstOption.length===0 || options.secondOption.length===0 || options.thirdOption.length===0 || options.fourthOption.length===0 || (options.isFirstTrue===false && options.isSecondTrue===false && options.isThirdTrue===false && options.isFourthTrue===false)}>Add Question</button>
        </form>
        <div className='text-center'>
        <button className='btn btn-primary mt-5' style={{maxWidth:"150px", minHeight:"40px"}} disabled={allQuestions.length===0} onClick={handleFinishedQuiz}>Finish Quiz</button>
        </div>
    </div>
  )
}

export default Questions