import React from 'react'
import { useNavigate } from 'react-router-dom';

const NavBar2 = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid d-flex Nav2 justify-content-between">
          <div>
            <a className="navbar-brand" href="/">Quizing</a>
          </div>
          <div className='btn-group dropstart HOME'><button className='profile' type="button" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg></button>
<ul className="dropdown-menu">
    <li><button className="dropdown-item" onClick={()=> navigate('/')} >Home</button></li>
    <li><button className="dropdown-item" onClick={props.handleSignout}>Log Out</button></li>
  </ul></div>
        </div>
      </nav>
      
    </div>
  )
}

export default NavBar2