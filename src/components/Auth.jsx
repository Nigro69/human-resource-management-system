import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Auth({ children }) {
  const [access, setAccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')

    console.log(access_token, refresh_token)
    
    const localAccess =
      access_token !== null &&
      refresh_token !== null &&
      access_token !== '';
    if(!localAccess) {
      if(refresh_token != null){

        fetch(`http://44.204.133.124/api/v1/team/token`, {
          method: "post",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh_token: refresh_token
          })
        })
        .then((res) => {
          return res.json();
        })
        .then((body) => {
            localStorage.setItem('access_token', body.access_token);
            localStorage.setItem('refresh_token', body.refresh_token);
            
            navigate('/')
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate("/login")
        });

      }else{
        navigate("/login")
      }
    }else{
      setAccess(true);
    }
  }, [access])

  return (
    <div>
      {
          access && children
      }
    </div>
  )
}