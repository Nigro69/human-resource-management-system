import React, { useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {HashLoader} from "react-spinners"

const EmailEditorr = () => {
  const emailEditorRef = useRef(null);
  const location = useLocation();

  const [tab, settab] = useState(1);
  const [subject, setsubject] = useState("");
  const [body, setbody] = useState("");
  const [ispending, setispending] = useState(false);
  const [tempSub, settempSub] = useState("");

  const sendSimpleMail = async () =>{
    try {
      const res = await axios.post("http://localhost:8006/sendMail",{
        email:location.state && location.state.email,
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
      const res = await axios.post("/sendMail",{
        email:location.state && location.state.email,
        html:`${html}`,
        subject:tempSub
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
    <div className="bg-gray-200 p-4 h-[600px]">
      <div className="flex gap-5 justify-between">
        <div className="font-bold text-2xl">Sending mail to {location.state.name && location.state.name}</div>
        {tab===2 && <button className="font-bold text-sm text-white bg-green-800 rounded-md px-6 py-1" disabled onClick={sendMail}>Send Mail</button>}
      </div>
      <div className="flex gap-3 px-4 pt-3">
        <button onClick={()=>settab(1)} className={`font-bold px-6 py-2 rounded-md ${tab===1 ? "border-b-2 border-b-green-800 bg-green-100 text-green-800":"text-gray-500 bg-gray-200"}`}>Simple Mail</button>
        <button onClick={()=>settab(2)} className={`font-bold px-6 py-2 rounded-md ${tab===2 ? "border-b-2 border-b-green-800 bg-green-100 text-green-800":"text-gray-500 bg-gray-200"}`}>Template Mail</button>
      </div>
      {tab===2 && <div className="space-y-3 p-4">
      <div className="font-bold tracking-wider">Subject</div>
        <div ><input value={tempSub} onChange={(e)=>settempSub(e.target.value)} placeholder="Enter your subject here" className="focus:outline-0 font-bold tracking-wider rounded-lg bg-gray-100 p-2 w-3/4 border" type="text" /></div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </div>}
      {tab===1 &&
      <div className="m-5 bg-white rounded-lg p-6 space-y-2">
        <div className="font-bold tracking-wider">Subject</div>
        <div ><input value={subject} onChange={(e)=>setsubject(e.target.value)} placeholder="Enter your subject here" className="focus:outline-0 font-bold tracking-wider rounded-lg bg-gray-100 p-2 w-3/4 border" type="text" /></div>
        <div className="font-bold tracking-wider">Body</div>
        <div><textarea value={body} onChange={(e)=>setbody(e.target.value)} placeholder="Compose mail body" className=" tracking-wider focus:outline-0 rounded-lg bg-gray-100 p-2 w-3/4 border"  cols="30" rows="10"></textarea></div>
        <div className="flex justify-end w-3/4"><button disabled onClick={()=>{sendSimpleMail(); setispending(true);}} className="font-bold text-white bg-green-800 px-6 py-2 rounded-md">Send</button></div>
      </div>
      }
      {ispending && <div className="grid place-items-center z-50 fixed bottom-0 left-0 right-0 top-0 bg-gray-500 bg-opacity-60">
        <div><HashLoader color="#FFD700" /></div>
      </div>}
    </div>
  );
};

export default EmailEditorr;
