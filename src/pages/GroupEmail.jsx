import React, { useEffect, useState,useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmailEditor from "react-email-editor";
import axios from "axios";
import {HashLoader} from "react-spinners"

const GroupEmail = () => {
  const location = useLocation();
  const [emails, setemails] = useState(null);
  const [tab, settab] = useState(1);

  {location.state && useEffect(() => {
    let array=[];
    {location.state && location.state.array.forEach(element => {
      array.push(element.email);
    })}
     setemails(array);
    {location.state && console.log(emails)};
  }, [tab])};

  const emailEditorRef = useRef(null);

  const [subject, setsubject] = useState("");
  const [body, setbody] = useState("");
  const [ispending, setispending] = useState(false);

  const sendSimpleMail = async () =>{
    try {
      const res = await axios.post("http://localhost:8006/sendMail",{
        email:emails,
        html:`<p>${body}<p/>`,
        subject:`${subject}`
      });
      {res.data.status === 201 && alert("Email sent succesfully")}
    } catch (error) {
      console.log(error.message);
    }
    setispending(false);
    setbody("");
    setsubject("");
  }
  
  const sendMail = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      setispending(true);
      {html && getMyResult(html)};
    });
  };

  const getMyResult = async (html) => {
    try {
      const res = await axios.post("http://localhost:8006/sendMail",{
        email:emails,
        html:`${html}`,
        subject:"Test subject"
      });
      setispending(false);
      {res.data.status === 201 && alert("Email sent succesfully")}
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const onLoad = () => {
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };
  const onReady = () => {
    // editor is ready
  };

  return (
    <div className="p-4 bg-gray-200">
      <div className="px-4 py-2 flex gap-4 place-items-center">
        <div className="font-bold text-2xl tracking-widest">
          Group Email Service
        </div>
      </div>
      <div className=" bg-white p-4 rounded-t-xl">
        <div className="flex justify-between">
          <div className="font-bold flex place-items-center">Recipients:</div>
          {tab===2 && <button className="font-bold text-sm text-white bg-green-800 rounded-md px-6 py-1" onClick={sendMail}>Send Mail</button>}
        </div>
        <div className="border-2 border-gray-400 rounded-xl my-2">
          <div className="grid grid-cols-4 px-6 py-4 gap-4 ">
            {location.state && location.state.array.map((recipient) => (
              <div
                className="grid place-items-center rounded-full px-3 py-2 text-sm font-bold bg-gray-200"
                key={recipient.id}
              >
                {recipient.email}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 px-4 pt-3 bg-white">
        <button
          onClick={() => settab(1)}
          className={`font-bold px-6 py-2 rounded-md ${
            tab === 1
              ? "border-b-2 border-b-green-800 bg-green-100 text-green-800"
              : "text-gray-500 bg-gray-200"
          }`}
        >
          Simple Mail
        </button>
        <button
          onClick={() => settab(2)}
          className={`font-bold px-6 py-2 rounded-md ${
            tab === 2
              ? "border-b-2 border-b-green-800 bg-green-100 text-green-800"
              : "text-gray-500 bg-gray-200"
          }`}
        >
          Template Mail
        </button>
      </div>
      {tab === 2 && (
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      )}
      {tab === 1 && (
        <div className=" bg-white rounded-b-lg p-6 space-y-2">
          <div className="font-bold tracking-wider">Subject</div>
          <div>
            <input
              value={subject}
              onChange={(e) => setsubject(e.target.value)}
              placeholder="Enter your subject here"
              className="focus:outline-0 font-bold tracking-wider rounded-lg bg-gray-100 p-2 w-3/4 border"
              type="text"
            />
          </div>
          <div className="font-bold tracking-wider">Body</div>
          <div>
            <textarea
              value={body}
              onChange={(e) => setbody(e.target.value)}
              placeholder="Compose mail body"
              className=" tracking-wider focus:outline-0 rounded-lg bg-gray-100 p-2 w-3/4 border"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="flex justify-end w-3/4">
            <button
              onClick={() => {
                sendSimpleMail();
                setispending(true);
              }}
              className="font-bold text-white bg-green-800 px-6 py-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
      {ispending && (
        <div className="grid place-items-center z-50 fixed bottom-0 left-0 right-0 top-0 bg-gray-500 bg-opacity-60">
          <div>
            <HashLoader color="#FFD700" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupEmail;
