import React, { useEffect, useState } from "react";
import {
  AiFillAudio,
  AiOutlineLink,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import {  chats } from "../data/dummy";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useNavigate } from "react-router-dom";
import { DefaultEditor } from "react-simple-wysiwyg";
import axios from "../axios";
import {RotateLoader} from "react-spinners"
import { auth } from "../firebase/config";
import {candidatesData} from "../data/dummy";

function Inbox() {
  const [tab, settab] = useState(1);
  const [apiData, setapiData] = useState(candidatesData);
  const [chatsData, setchatsData] = useState([]);
  const [isPending, setisPending] = useState(true);
  const [detailedId, setdetailedId] = useState(1);
  const [messages, setmessages] = useState(null);
  const [filteredDta, setfilteresData] = useState(apiData);
  const [inputMsg, setinputMsg] = useState(null);
  const [search, setsearch] = useState("");
  const [file, setFile] = useState(null);
  const [modal, setmodal] = useState(false);
  const [tTab, settTab] = useState(1);
  const [content, setcontent] = useState(null);
  const [title, settitle] = useState("");
  const [tempDataArray, settempDataArray] = useState([]);
  const [chatPending, setchatPending] = useState(true);

  const navigate = useNavigate();

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    if(file){
      let msg = {
        id: Math.floor(Math.random() * 1000 + 1),
        body: `<a href=${file}><div><p>&nbsp; <strong style="font-size: 18px;">Document</strong><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP64kr8u-sTKflOnGE28_tnrE4xHlMHzHHTA&amp;usqp=CAU" alt="" width="49" height="51" style="float: left;"></p></div></a>`,
        timeStamp: Date.now(),
        myMsg: true,
      };
      setmessages([...messages, msg]);
      // sendFile();
    }

  }, [file]);

  const sendFile = async () => {
    try {
      const res = await axios.post("/chats/",{
        "profile_id": auth.currentUser.uid + detailedId,
        "messsage": `<a href=${file}><div><p>&nbsp; <strong style="font-size: 18px;">Document</strong><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP64kr8u-sTKflOnGE28_tnrE4xHlMHzHHTA&amp;usqp=CAU" alt="" width="49" height="51" style="float: left;"></p></div></a>`,
        "check_user": true,
        "time_stamp":Date.now()
      });
      console.log(res.data);
      getChatsResult();
      setFile(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {

    settempDataArray([{
      id: 1,
      title: `New employee announcement ${apiData[detailedId - 1] && apiData[detailedId - 1].name}`,
      body: `<p style="box-sizing: border-box; margin-bottom: 20px;"><ol><li>Hi ${
        apiData[detailedId - 1] && apiData[detailedId - 1].name
      }!</li></ol><div><br></div><div>We're thrilled to have ${
        apiData[detailedId - 1] && apiData[detailedId - 1].name
      } join our team as SDE role. ${
        apiData[detailedId - 1] && apiData[detailedId - 1].name
      } has 2 of experience working in fawr Bsol and we can't wait to see what they'll bring to our team.<br></div><div><br></div><div>Outside of ${
        apiData[detailedId - 1] && apiData[detailedId - 1].name
      }'s professional experience, they also enjoy [List activities, hobbies, etc.]. Make sure to give ${
        apiData[detailedId - 1] && apiData[detailedId - 1].name
      } a big fawr Bsol welcome the next time you see them. Welcome to the team, ${
        apiData[detailedId - 1] && apiData[detailedId - 1].name
      }!</div></p><div>Kindly,&nbsp;</div><div><div><br></div><div>HR</div></div>`,
    },
    {
      id: 2,
      title: "Candidate Rejection",
      body: `<div>Dear ${
        apiData[detailedId - 1] && apiData[detailedId - 1].name
      },</div><div><br></div><div>Thank you for taking the time to meet with our team about the SDE Intern role at Fawr Bsol. It was a pleasure to learn more about your skills and accomplishments.</div><div>Unfortunately, our team did not select you for further consideration.</div><div>I would like to note that competition for jobs at Fawr Bsol is always strong and that we often have to make difficult choices between many high-caliber candidates. Now that we've had the chance to know more about you, we will be keeping your resume on file for future openings that better fit your profile.</div><div>I am happy to answer your questions if you would like any specific feedback about your application or interviews.</div><div>Thanks again for your interest in Fawr Bsol&nbsp; and best of luck with your job search.</div><div><br></div><div>Visit our <a href="https://www.fawrtech.com/careers">career site</a> for more opportunities.</div><div><br></div><div>Regards,</div><div><br></div><div>HR</div>`,
    },
  ])
  }, [detailedId,apiData]);

  useEffect(() => {
    const result = apiData && apiData.filter((itr) => {
      return itr.name.toLowerCase().match(search.toLowerCase());
    });
    setfilteresData(result);

    if (search.length === 0) {
      setfilteresData(apiData);
    }
  }, [search, filteredDta,isPending]);


  const handleSubmit = async () => {
    try {
      // const res = await axios.post("/chats/",{
      //   "profile_id": auth.currentUser.uid + detailedId,
      //   "messsage": inputMsg,
      //   "check_user": true,
      //   "time_stamp":Date.now()
      // });
      let msg = {
        id: Math.floor(Math.random() * 1000 + 1),
        body: inputMsg,
        timeStamp: Date.now(),
        myMsg: true,
      };
      setmessages([...messages, msg]);
      console.log(res.data);
      getChatsResult();
    } catch (error) {
      console.log(error.message);
    }
    setinputMsg("");
  };

  const sendTemplate = (id) => {
    sendTemplateMsg(id);
    setmodal(false);
  };

  const sendTemplateMsg = async (id) => {
    try {
      // const res = await axios.post("/chats/",{
      //   "profile_id": auth.currentUser.uid + detailedId,
      //   "messsage": tempDataArray[id-1].body,
      //   "check_user": true,
      //   "time_stamp":Date.now()
      // });
      // console.log(res.data);
      let msg = {
        id: Math.floor(Math.random() * 1000 + 1),
        body: tempDataArray[id - 1].body,
        timeStamp: Date.now(),
        myMsg: true,
      };
      setmessages([...messages, msg]);
      // getChatsResult();
    } catch (error) {
      console.log(error.message);
    }
  };

  const createTemplate = () =>{
    let template = {
      id: tempDataArray.length + 1,
      title:title,
      body: content,
    };
    settempDataArray([...tempDataArray, template]);
    settTab(1);
    settitle("");
    setcontent(null);
  }

  const getMyResult = async () => {
    try {
      // const res = await axios.get("/profile/");
      // setapiData(res.data);
      setisPending(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getChatsResult = async () => {
    try {
    //   const res = await axios.get("/chats/");
    //   setchatsData(res.data);
    //   let arrCopy =[];
    //   res.data.forEach(data=>{
    //   if(data.profile_id == (auth.currentUser && auth.currentUser.uid) + detailedId){
    //     arrCopy.push(data);
    //   }
    // })
    // setmessages([...arrCopy]);
    let object = chats.find((chat) => chat.chatId - 1 === detailedId);
    setmessages(object && object.messages);
    } catch (error) {
      console.log(error.message);
    }
    setchatPending(false);
  };

  useEffect(() => {
    setisPending(true);
    setchatPending(true);
    getMyResult();
    getChatsResult();
  },[detailedId]);

  return (
    <div className="bg-gray-200 ">
      <div className="flex justify-between">
      <div className="flex gap-5  px-6 pt-4">
        <button
          onClick={() => settab(1)}
          className={` font-bold px-6 py-3 text-gray-400 uppercase ${
            tab === 1 && "text-gray-800 border-b-2 border-b-[#FFD700]"
          } `}
        >
          Recuritment Inbox
        </button>
        <button
          onClick={() => settab(2)}
          className={` font-bold px-4 py-3 text-gray-400 uppercase ${
            tab === 2 && "text-gray-800 border-b-2 border-b-[#FFD700]"
          } `}
        >
          Work Inbox
        </button>
      </div>

      </div>
      <div className="relative h-[548px] w-full ">
        <div className="absolute inset-y-0 left-0 w-72 h-full bg-white overflow-auto scrollbar-thin scrollbar-thumb-[#FFD700]  scrollbar-track-white">
          <div className="flex sticky top-0 bg-white place-items-center border px-2 py-1">
            <div>
              <AiOutlineSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="p-2 focus:outline-0"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
          <div className="">
            {!isPending && filteredDta.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => setdetailedId(candidate.id)}
                className={`flex p-2 cursor-pointer ${
                  detailedId === candidate.id
                    ? "border-2 border-green-800 bg-green-100"
                    : "border"
                }`}
              >
                <div className="grid place-items-center w-[40px]">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={candidate.imgUrl}
                    alt=""
                  />
                </div>
                <div className="w-full px-2">
                  <div className="flex justify-between">
                    <div className="font-bold">{candidate.name}</div>
                    <div className="font-semibold text-gray-500 text-sm">
                      2 Days ago
                    </div>
                  </div>
                  <div className="font-semibold text-gray-500 text-sm">
                    {candidate.jobTitle}
                  </div>
                  <div className="font-semibold text-gray-500 text-sm">
                    message
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-72 relative h-full">
          <div className="p-4 bg-white border flex justify-between">
            <div>
              <div className="font-bold text-lg">
                Your application for Job:
                {apiData[detailedId - 1] &&
                  apiData[detailedId - 1].jobTitle}{" "}
              </div>
              <div className="font-bold text-gray-500 flex place-items-center">
                Status:{" "}
                <div className="text-green-800 font-bold grid place-items-center">
                  Active
                </div>
              </div>
            </div>
            <div className="grid place-items-center">
              <button
                onClick={() => navigate("/inbox/email",{state:{name:apiData[detailedId - 1] && apiData[detailedId - 1].name,email:apiData[detailedId - 1] && apiData[detailedId - 1].email}})}
                className="border border-gray-500 rounded-md text-sm font-bold px-6 py-2"
              >
                Send Email
              </button>
            </div>
          </div>
          <div className=" absolute top-[75px] bottom-[114px] w-full p-2 overflow-auto">
            {messages && messages.map((message) => (
              <div
                key={message.id}
                className={`space-y-1 my-1 grid ${
                  message.myMsg ? "justify-items-end" : "justify-items-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg shadow-lg inline-block max-w-sm  ${
                    message.myMsg? "bg-green-100 text-green-800" : "bg-white"}`}
                >
                  {<div dangerouslySetInnerHTML={{ __html: message.body }} />}
                </div>
                <div className="text-sm ">
                  {timeAgo.format(message.timeStamp)}
                  {/* {message.time_stamp} */}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 bg-white absolute bottom-0 w-full space-y-1">
            <div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="text-lg px-2 py-1 w-full rounded-md focus:outline-0 border-2"
                  placeholder="Type your message here..."
                  value={inputMsg}
                  onChange={(e) => {
                    setinputMsg(e.target.value);
                  }}
                />
              </form>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <label className="">
                  <AiOutlineLink className="text-gray-500 bg-gray-200 p-2 h-8 w-8 cursor-pointer rounded-full" />
                  <input
                    type="file"
                    onChange={(e) => {
                      setFile(URL.createObjectURL(e.target.files[0]));
                    }}
                    name="file_upload"
                    className="hidden"
                    alt="cover"
                  />
                </label>
                <AiFillAudio className="text-gray-500 bg-gray-200 p-2 h-8 w-8 cursor-pointer rounded-full" />
                <BsEmojiSmile className="text-gray-500 bg-gray-200 p-2 h-8 w-8 cursor-pointer rounded-full" />
                <div>
                  <button
                    onClick={() => setmodal(true)}
                    className="border-2 hover:bg-gray-200 font-bold text-sm px-6 py-1 rounded-md text-gray-500"
                  >
                    Use Template
                  </button>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  className="text-white bg-green-800 rounded-md text-sm px-6 py-2 font-bold "
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 w-72 h-full bg-white overflow-auto scrollbar-thin scrollbar-thumb-[#FFD700]  scrollbar-track-white">
          <div className="p-4 grid place-items-center border space-y-2">
            <div className="">
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={
                  apiData[detailedId - 1] &&
                  apiData[detailedId - 1].imgUrl
                }
                alt=""
              />
            </div>
            <div className="text-lg font-bold tracking-widest">
              {apiData[detailedId - 1] &&
                apiData[detailedId - 1].name}
            </div>
            <div className="flex gap-4">
              <div className="border rounded-full bg-green-100 text-green-800 border-green-800 font-semibold text-xs px-2 py-1">
              {apiData[detailedId - 1] &&
                apiData[detailedId - 1].status}
                Active
              </div>
              <div className="font-semibold text-gray-500">{apiData[detailedId - 1] &&
                apiData[detailedId - 1].origin}</div>
            </div>
            <div className="font-bold text-gray-500 text-sm cursor-pointer">
              View Profile
            </div>
          </div>
          <div className="border p-4 flex justify-between">
            <div>
              <div className="font-bold text-gray-500 text-sm">
                Applied for:
              </div>
              <div className="font-bold">
                Job:
                {apiData[detailedId - 1] &&
                  apiData[detailedId - 1].jobTitle}
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-500 text-sm">Stage:</div>
              <div className="font-bold">
                {apiData[detailedId - 1] &&
                  apiData[detailedId - 1].stage}
              </div>
            </div>
          </div>
          <div className="border p-4 grid place-items-center space-y-2">
            <div className="font-bold text-gray-500 flex gap-2 place-items-center">
              <AiOutlineMail />
              {apiData[detailedId - 1] &&
                apiData[detailedId - 1].email}
            </div>
            <div className="font-bold text-gray-500 flex gap-2 place-items-center">
              <AiOutlinePhone />
              {/* {apiData[detailedId - 1] &&
                  apiData[detailedId - 1].phonenumber} */}
                  5468796123
            </div>
          </div>
          <div className="border p-4 space-y-4">
            <div className="font-bold text-sm text-gray-500">Schedule</div>
            <div className="space-y-2">
              <div className="p-4 border border-l-4 border-l-green-800 rounded-xl shadow-xl">
                Interview scheduled on 25 march 12:30 AM
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed grid place-items-center top-0 bg-gray-500 bg-opacity-80 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
          <div className="relative w-full h-[500px] max-w-4xl  ">
            <div className="relative bg-white h-full rounded-lg shadow overflow-auto">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold">Select Template</h3>
                <button
                  onClick={() => setmodal(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="px-6 py-2">
                <div className="flex">
                  <button
                    onClick={() => settTab(1)}
                    className={`${
                      tTab === 1 && "border-b-2 border-b-blue-500"
                    }  px-4 py-2 text-sm font-bold`}
                  >
                    Available Templates
                  </button>
                  <button
                    onClick={() => settTab(2)}
                    className={`${
                      tTab === 2 && "border-b-2 border-b-blue-500"
                    }  px-4 py-2 text-sm font-bold`}
                  >
                    Create Template
                  </button>
                </div>
                {tTab === 1 && (
                  <div className="h-full w-full p-4 space-y-2">
                    {tempDataArray.map(data=>(
                    <div key={data.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between place-items-center">
                        <div className="font-semibold tracking-wider">
                          {data.title}
                        </div>
                        <div>
                          <button
                            onClick={()=>sendTemplate(data.id)}
                            className="rounded-full px-4 py-2 border bg-gray-100 font-bold text-sm text-gray-600 hover:bg-blue-500 hover:text-white"
                          >
                            Use
                          </button>
                        </div>
                      </div>
                      <div>
                        <div dangerouslySetInnerHTML={{ __html: data.body }} />
                      </div>
                    </div>
                    ))}
                  </div>
                )}
                {tTab === 2 && (
                  <div className="h-full w-full">
                    <div className="p-4 space-y-2">
                      <div className="font-bold">Title</div>
                      <div>
                        <input
                          className="w-2/4 focus:outline-0 p-2 border rounded-md bg-gray-100"
                          type="text"
                          value={title}
                          onChange={(e)=>settitle(e.target.value)}
                        />
                      </div>
                      <div className="font-bold">Design Body</div>
                      <DefaultEditor
                        value={content}
                        onChange={(e) => setcontent(e.target.value)}
                      />
                      <div className="grid place-items-end">
                        <button onClick={createTemplate} className="font-bold text-sm bg-blue-500 px-6 py-2 rounded-md text-white">
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inbox;
