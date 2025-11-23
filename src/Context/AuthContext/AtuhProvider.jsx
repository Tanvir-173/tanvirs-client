import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
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

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
        
    }

    const UpdateUserProfile = (profile) =>{

        return updateProfile(auth.currentUser, profile)
    }

    useEffect(()=>{
        const unsbuscribe = onAuthStateChanged(auth, (currentUser) =>{
              
            setUser(currentUser)
            setLoading(false)
        })
        return () =>{

            unsbuscribe()
        }

    },[])

    const authInfo={
        user,
        loading,
        registerUser,
        signInUser,
        singInGoogle,
        logOut,
        UpdateUserProfile

    } 
    return (
      <AuthContext value={authInfo}>
            {children}
      </AuthContext>
    );
};

export default AtuhProvider;