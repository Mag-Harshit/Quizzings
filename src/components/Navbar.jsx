import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    if(props.user){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  },[props.user])

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between">
          <div>
            <a className="navbar-brand" href="/">Quizing</a>
          </div>
          <form className="d-flex searchMenu mx-1" role="search">
            <input className="form-control me-2" style={{ width: '600px' }} type="search" placeholder="Search a quiz" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <div className='d-flex'>
            {loggedIn?<div className='btn-group dropstart'><button className='profile' type="button" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg></button>
<ul className="dropdown-menu">
    <li><button className="dropdown-item" onClick={()=> navigate('/create')} href="#">Create a Quiz</button></li>
    <li><button className="dropdown-item" href="#" onClick={props.handleSignout}>Log Out</button></li>
  </ul></div>:<button type="button" className='btn btn-primary SignButton border' onClick={() => navigate('/Login')}>
              Sign In
            </button>}
            
          </div>
        </div>
      </nav>
      
    </div>
  );
}

export default Navbar;