import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getToken,storeToken } from "../LocalStorage";
import { PropagateLoader } from 'react-spinners';

const Login = () => {

    const { authToken, setauthToken } =useStateContext();

    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [isPending, setisPending] = useState(false);
    const [erroeMessage, seterroeMessage] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setisPending(true);
      logIn(email, password);
      setemail("");
      setpassword("");
    };

    const logIn = async (email, password) => {
        try {
          const res = await signInWithEmailAndPassword(auth, email, password);
          storeToken(res.user.accessToken);
          seterroeMessage(false);
          const yash = getToken();
          setauthToken(yash);
          navigate("/dashboard");
          setisPending(false);
        } catch (error) {
          console.log(error);
          navigate("/login");
          seterroeMessage(true);
          setisPending(false);
        }
      };
    
      useEffect(() => {
        const yash = getToken();
        setauthToken(yash);
      }, [authToken, setauthToken]);

  return (
    <div className="grid justify-center items-center h-screen bg-[#020202]">
      <div>
        {erroeMessage && (
          <div className="p-4 my-2 border border-red-300 rounded-md bg-[#FF3131] text-sm bg-opacity-40 text-white">
            Please check your Email and Password again.
          </div>
        )}
        <div className=" bg-gray-900 rounded-t p-6 ">
          <form className="w-96 space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="text-gray-400">Log In</p>
              <h2 className="text-xl font-bold text-white">
                Join our community
              </h2>
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <div>
              {!isPending && (
                <button className="w-full py-4 bg-[#FFD700] rounded text-md font-bold text-gray-800 transition duration-200">
                  Log In
                </button>
              )}
              {isPending && (
                <button
                  disabled={true}
                  className="w-full py-4 bg-[#FFD700] rounded "
                >
                  <PropagateLoader className='my-auto' color="#000000" />
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="bg-gray-900 px-6 py-4 flex place-items-center justify-between text-white">
          <div>Don't have an account yet?</div>
          <button onClick={() => navigate("/signup")}>Sign up</button>
        </div>
      </div>
    </div>
  )
}

export default Login