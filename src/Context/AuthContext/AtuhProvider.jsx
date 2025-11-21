import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';

const googleProvider = new GoogleAuthProvider()

const AtuhProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading]= useState(true)
    const registerUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword (auth, email, password)

        }

    const signInUser = (email, password) =>{
         setLoading(true)
         return signInWithEmailAndPassword(auth,email,password)
    }
    
    const singInGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const authInfo={
        user,
        loading,
        registerUser,
        signInUser,
        singInGoogle

    } 
    return (
      <AuthContext value={authInfo}>
            {children}
      </AuthContext>
    );
};

export default AtuhProvider;