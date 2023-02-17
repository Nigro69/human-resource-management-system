import React, { useRef, useState } from "react";
import EmailEditor from "react-unlayer-editor";

const EmailEditorr = () => {
  const emailEditorRef = useRef(null);
  const [mailbody, setmailbody] = useState(null);
  
  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      // setmailbody(`${html}`);
      sendMail(html);
      console.log(mailbody);
    });
  };
  const sendMail = (html) => {

    
    const config = {
      Host: "smtp.elasticemail.com",
      Username: "yashbarman3010@gmail.com",
      Password: "E0FB608B8FA1BAC886680DB79D47033C18EE",
      Port: 2525,
      To: "tedxjecofficial@gmail.com",
      From: "yashbarman3010@gmail.com",
      Subject: "This is the subject",
      Body:"yash",
      html:"<h1>html</h1>",
    };
    {
      window.Email &&
        window.Email.send(config).then((message) => alert(message));
    }
  };
  const onLoad = () => {
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };
  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };
  return (
    <div className="overflow-hidden p-4">
      <div className="flex gap-5">
        <button className="font-bold text-sm text-white bg-green-800 rounded-md px-6 py-1" onClick={exportHtml}>Export HTML</button>
        <button className="font-bold text-sm text-white bg-green-800 rounded-md px-6 py-1" onClick={sendMail}>Send Email</button>
      </div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </div>
  );
};

export default EmailEditorr;
