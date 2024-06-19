import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';



const SignIn = (props) => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [missingEmail, setMissingEmail] = useState(false)
    const [weakPassword, setWeakPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [emailExists, setEmailExists] = useState(false)
    const [loginError, setLoginError] = useState(true);


    useEffect(() => {
      console.log(props.user)
      if (props.user) {
        navigate('/');
      }
    }, [navigate,props.user]);

    const handleSignIn = (event)=>{
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
          const user=userCredential.user;
          console.log(user);
          console.log(user.uid)
          navigate('/')
          
          window.location.reload();
      })
      .catch((error)=>{
          const errorCode = error.code;
          setLoginError(false);
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
      })
      setLoginError(true)
      event.preventDefault();
    }

  const handleSignUp = (event)=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        console.log(user);
        navigate('/');
        window.location.reload();

    })
    .catch((error)=>{
        const errorCode = error.code;
        console.log(errorCode);
        if(errorCode==='auth/email-already-in-use'){
          setEmailExists(true);
        } else{
          setEmailExists(false);
        }
        if(errorCode==='auth/invalid-email'){
          setInvalidEmail(true);
        }else{
          setInvalidEmail(false);
        }
        if(errorCode==='auth/weak-password'){
          setWeakPassword(true);
        }else{
          setWeakPassword(false);
        }if(errorCode==='auth/missing-email'){
          setMissingEmail(true);
        } else{
          setMissingEmail(false);
        }
        
    })
    event.preventDefault();
  }

  const handleEmailChange = (event)=> setEmail(event.target.value);
  const handlePasswordChange = (event)=>setPassword(event.target.value);
  return (
<main className="text-center form-signin w-100 m-auto container" >
  <form style={{marginTop:'10%'}}>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating mx-auto w-50">
      <input type="email" onChange={handleEmailChange} className="form-control w-100" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating mx-auto w-50">
      <input type="password" onChange={handlePasswordChange} className="form-control w-100" id="floatingPasswordss" placeholder="Password"/>
      <label for="floatingPasswordss">Password</label>
    </div>
    {loginError? '':<div classNameName="alert alert-danger w-25 mx-auto" style={{textAlign:"center"}} role="alert">
Invalid Email or Password
</div>}

    <button className="btn btn-primary w-25 py-2" type="submit" onClick={handleSignIn}>Sign in</button>
    <p className="mt-2 mb-3 text-body-secondary">OR</p>
  </form>
  <button className="btn btn-secondary w-25 py-2 border" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="submit">Sign up</button>

{/*MODAL STARTS FROM HERE!!! */}

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Sign Up</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

<div className="form-floating mx-auto m-2 w-50">
  <input type="email" onChange={handleEmailChange} value={email} className="form-control w-100" id="floatingInputs" placeholder="name@example.com"/>
  <label for="floatingInputs">Email address</label>
</div>
{ emailExists?<div className='emailPassExists' style={{color: "var(--bs-danger-text-emphasis)"}}> 
      ⚠️ Email already exists.
    </div>:""}
    { invalidEmail?<div className='emailPassExists' style={{color: "var(--bs-danger-text-emphasis)"}}> 
      ⚠️ Invalid Email
    </div>:""}
    { missingEmail?<div className='emailPassExists' style={{color: "var(--bs-danger-text-emphasis)"}}> 
      ⚠️ Please Enter an email
    </div>:""}
<div class="form-floating mx-auto m-3 w-50">
  <input onChange={handlePasswordChange} value={password} type="password" class="form-control w-100" id="floatingPasswords" placeholder="Password"/>
  <label for="floatingPasswords">Password</label>
  { weakPassword?<div className='emailPassExists' style={{color: "var(--bs-danger-text-emphasis)"}}> 
      ⚠️ Password should be at least 6 characters.
    </div>:""}
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleSignUp} class="btn btn-primary">Sign Up</button>
      </div>
    </div>
  </div>
</div>
</main>
    

  )
}

export default SignIn;