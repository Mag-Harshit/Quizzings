'use client'

import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from '../firebase/firebase.js';
import { onAuthStateChanged , getAuth, signOut} from 'firebase/auth';
import { ProtectedRoute } from './protectedRoute.jsx';
import { useNavigate } from 'react-router-dom';
import Create from './Create.jsx';
import Navbar from './Navbar.jsx';
import SignIn from './SignIn.jsx';
import Input from './Input.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        console.log(user)
        setUser(user);
        return;
      }
    });
    return ()=> unsubscribe();
  },[]);

  function handleLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null);
      console.log("Sign out")
    }).catch((error) => {
      console.error('Sign out error:', error);
    });
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/" element={<Navbar user={user} handleSignout={handleLogout}/>}/>
          <Route path="/Login" element={<SignIn user={user} />} />
          <Route path="/create" element={
            <ProtectedRoute user={user}>
              <Create user={user} handleSignout={handleLogout} />
            </ProtectedRoute>
          } />
        <Route path="/quizCreation" element={<ProtectedRoute user={user}>
        <Input user={user} handleSignout={handleLogout}/>
        </ProtectedRoute>
         }/>
          
           </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;