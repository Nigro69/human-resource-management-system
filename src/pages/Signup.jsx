import React, { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { getToken, storeToken } from "../LocalStorage";
import { PropagateLoader } from "react-spinners";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const Signup = () => {
  const navigate = useNavigate();

  const { authToken, setauthToken } = useStateContext();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isPending, setisPending] = useState(false);
  const [erroeMessage, seterroeMessage] = useState(false);
  const [success, setsuccess] = useState(false);
  const [file, setfile] = useState(null);
  const [name, setname] = useState("");
  const [paramToken, setparamToken] = useState("");

  const [queryParameters] = useSearchParams();

  // useEffect(() => {
  //   const getToken = queryParameters.get("token");
  //   setparamToken(getToken);
  // }, [paramToken])
  


  const handleSubmit = (e) => {
    e.preventDefault();
    setisPending(true);
    // signUp(email, password);
    console.log(queryParameters.get("token"), queryParameters);
    getMyResult(queryParameters.get("token"));
    setemail("");
    setpassword("");
  };

  const signupHogaya = () => {
    const yash = getToken();
    setauthToken(yash);
    navigate("/");
  };

  const signUp = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      setsuccess(true);
      // getMyResult(res.user.uid);
      storeToken(res.user.accessToken);
      seterroeMessage(false);
      setTimeout(signupHogaya, 3000);
      seterroeMessage("");
      setisPending(false);
    } catch (error) {
      console.log(error.message);
      const message = error.message;
      setisPending(false);
      seterroeMessage(message.slice(9));
    }
  };

  const getMyResult = async (accToken) => {
    try {
      const res = await axios.post(`https://bdmhrmnode.bigbros.link/api/v1/team/createhrmuser?token=${accToken}`, {
        email,
        role:"hr",
        name,
        password,
        display_picture: file
    });
      console.log(res.data);
      localStorage.setItem("access_token", res.data.data.access_token);
      localStorage.setItem("refresh_token", res.data.data.refresh_token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="grid justify-center items-center h-screen bg-[#020202]">
      <div>
        {success && (
          <div className="p-4 my-2 border border-green-300 rounded-md bg-green-800 text-sm bg-opacity-40 text-white">
            You successfully register yourself.
          </div>
        )}
        {erroeMessage && (
          <div className="p-4 my-2 border border-red-300 rounded-md bg-[#FF3131] text-sm bg-opacity-40 text-white">
            {erroeMessage}
          </div>
        )}
        <div>
          <div className=" bg-gray-900 rounded-t p-6 ">
            <form className="w-96 space-y-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <p className="text-gray-400">Sign Up</p>
                <h2 className="text-xl font-bold text-white">
                  Join our community
                </h2>
              </div>
              <div>
                <input
                  className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
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
              {!file && <label className="">
                  <div className="text-white">Choose Profile Picture</div>
                  <input
                    type="file"
                    onChange={(e) => {
                      setfile(URL.createObjectURL(e.target.files[0]));
                    }}
                    name="file_upload"
                    className="hidden"
                    alt="cover"
                  />
                </label>}
                {file && (
              <div className="flex gap-4 place-items-center p-2">
                <img className="h-28 w-28 object-cover" src={file} alt="" />
                <button
                  className="px-2 py-2 rounded-full bg-[#BC312E] "
                  onClick={() => setfile()}
                >
                  <MdDelete />
                </button>
              </div>
            )}
              </div>
              <div>
                {!isPending && (
                  <button className="w-full py-4 bg-[#FFD700] rounded text-md font-bold text-gray-800 transition duration-200">
                    Sign Up
                  </button>
                )}
                {isPending && (
                  <button
                    disabled={true}
                    className="w-full py-4 bg-[#FFD700] rounded "
                  >
                    <PropagateLoader className="my-auto" color="#000000" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="bg-gray-900 px-6 py-4 flex place-items-center justify-between text-white">
          <div>Already have an account.</div>
          <button onClick={() => navigate("/login")}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
