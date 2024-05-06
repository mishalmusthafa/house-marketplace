import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStatus = () => {
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

useEffect(()=>{
  const auth = getAuth()
  onAuthStateChanged(auth,(user)=>{
    if(user){
      setLoggedIn(true)
    }
    setCheckingStatus(false)
  })
})

  return {loggedIn, checkingStatus}
};
