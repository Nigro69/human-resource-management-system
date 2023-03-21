import React, { useEffect, useState } from "react";
import {
  AiFillAudio,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLink,
  AiOutlineMail,
} from "react-icons/ai";
import { BsChevronDown, BsEmojiSmile } from "react-icons/bs";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { chats } from "../data/dummy";
import PdfViewer from "./PdfViewer";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { DefaultEditor } from "react-simple-wysiwyg";
import { ClockLoader, ScaleLoader } from "react-spinners";
import axios from "../axios";
import { async } from "@firebase/util";

const CandidateDetailed = ({ func, detailed, id }) => {
  const [tabs, settabs] = useState(1);
  const [status, setstatus] = useState("Fail");
  const [dropstatus, setdropstatus] = useState(false);
  const [snooze, setsnooze] = useState("");
  const [dropsnooze, setdropsnooze] = useState(false);
  const [messages, setmessages] = useState([]);
  const [inputMsg, setinputMsg] = useState(null);
  const [file, setFile] = useState(null);
  const [modal, setmodal] = useState(false);
  const [modal2, setmodal2] = useState(false);
  const [title, settitle] = useState("");
  const [content, setcontent] = useState(null);
  const [tempDataArray, settempDataArray] = useState([]);
  const [tTab, settTab] = useState(1);
  const [isPending, setisPending] = useState(false);
  const [apiData, setapiData] = useState({});
  const [interviewData, setinterviewData] = useState(null);
  const [dropofficial, setdropofficial] = useState(false);
  const [officail, setofficail] = useState("");
  const [stage, setstage] = useState("");
  const [dropstage, setdropstage] = useState(false);
  const [meetlink, setmeetlink] = useState("");
  const [timeAndDate, settimeAndDate] = useState(null);
  const [isIntPending, setisIntPending] = useState(true);
  const [updateBtn, setupdateBtn] = useState(false);
  const [intid, setintid] = useState(null);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const scheduleInterview = async () => {
    setisIntPending(true);
    try {
      const res = await axios.post(`/interview/`, {
        "official_name": officail,
        "meeting_link": meetlink,
        "stage": stage,
        "date": timeAndDate,
        "candidate":id,
        "official_image":"image"
      });
    } catch (error) {
      console.log(error.message);
    }
    interviewResult();
    setmodal2(false);
    setofficail("");
    setstage("");
    setmeetlink("");
    settimeAndDate(null);
    setupdateBtn(false);
  };

  const handleSubmit = () => {
    let msg = {
      id: Math.floor(Math.random() * 1000 + 1),
      body: inputMsg,
      timeStamp: Date.now(),
      myMsg: true,
    };
    setmessages([...messages, msg]);
    setinputMsg("");
  };

  useEffect(() => {
    file && setinputMsg(file);
  }, [file]);

  useEffect(() => {
    let object = chats.find((chat) => chat.chatId - 1 === id);
    setmessages(object && object.messages);
    settempDataArray([
      {
        id: 1,
        title: `New employee announcement ${apiData && apiData.name}`,
        body: `<p style="box-sizing: border-box; margin-bottom: 20px;"><ol><li>Hi ${
          apiData && apiData.name
        }!</li></ol><div><br></div><div>We're thrilled to have ${
          apiData && apiData.name
        } join our team as SDE role. ${
          apiData && apiData.name
        } has 2 of experience working in fawr Bsol and we can't wait to see what they'll bring to our team.<br></div><div><br></div><div>Outside of ${
          apiData && apiData.name
        }'s professional experience, they also enjoy [List activities, hobbies, etc.]. Make sure to give ${
          apiData && apiData.name
        } a big fawr Bsol welcome the next time you see them. Welcome to the team, ${
          apiData && apiData.name
        }!</div></p><div>Kindly,&nbsp;</div><div><div><br></div><div>HR</div></div>`,
      },
      {
        id: 2,
        title: "Candidate Rejection",
        body: `<div>Dear ${
          apiData && apiData.name
        },</div><div><br></div><div>Thank you for taking the time to meet with our team about the SDE Intern role at Fawr Bsol. It was a pleasure to learn more about your skills and accomplishments.</div><div>Unfortunately, our team did not select you for further consideration.</div><div>I would like to note that competition for jobs at Fawr Bsol is always strong and that we often have to make difficult choices between many high-caliber candidates. Now that we've had the chance to know more about you, we will be keeping your resume on file for future openings that better fit your profile.</div><div>I am happy to answer your questions if you would like any specific feedback about your application or interviews.</div><div>Thanks again for your interest in Fawr Bsol&nbsp; and best of luck with your job search.</div><div><br></div><div>Visit our <a href="https://www.fawrtech.com/careers">career site</a> for more opportunities.</div><div><br></div><div>Regards,</div><div><br></div><div>HR</div>`,
      },
    ]);
  }, [id]);

  const sendTemplate = (id) => {
    let msg = {
      id: Math.floor(Math.random() * 1000 + 1),
      body: tempDataArray[id - 1].body,
      timeStamp: Date.now(),
      myMsg: true,
    };
    setmessages([...messages, msg]);
    setmodal(false);
  };

  const createTemplate = () => {
    let template = {
      id: tempDataArray.length + 1,
      title: title,
      body: content,
    };
    settempDataArray([...tempDataArray, template]);
    settTab(1);
    settitle("");
    setcontent(null);
  };

  const getMyResult = async () => {
    try {
      const res = await axios.get(`/profile/${id}`);
      setapiData(res.data);
      setisPending(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const interviewResult = async () => {
    try {
      const res = await axios.get(`/interview/`);
      let arrCopy = [];
      res.data.forEach((data) => {
        if (data.candidate == id) {
          arrCopy.push(data);
        }
      });
      setinterviewData(arrCopy);
      setisIntPending(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteInterview = async (id) => {
    setisIntPending(true);
    try {
      const res = await axios.delete(`/interview/${id}`);
      interviewResult();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateInterview =async (id) =>{
    setupdateBtn(true);
    setintid(id);
    try {
      const res = await axios.get(`/interview/${id}`);
    setofficail(res.data.official_name);
    setstage(res.data.stage);
    setmeetlink(res.data.meeting_link);
    settimeAndDate(res.data.date);
    } catch (error) {
      console.log(error.message);
    }
    setmodal2(true);
  }

  const updateCurrInterview =async () =>{
    setisIntPending(true);
    try {
      const res = await axios.put(`/interview/${intid}`, {
        "official_name": officail,
        "meeting_link": meetlink,
        "stage": stage,
        "date": timeAndDate,
        "candidate":id,
        "official_image":"image"
      });
    } catch (error) {
      console.log(error.message);
    }
    interviewResult();
    setmodal2(false);
    setofficail("");
    setstage("");
    setmeetlink("");
    settimeAndDate(null);
    setintid(null);
    setupdateBtn(false);
  }

  useEffect(() => {
    getMyResult();
    interviewResult();
    setisPending(true);
  }, [id]);

  return (
    <div
      className={`${
        detailed
          ? "fixed top-0 left-0 right-0 z-10 bg-gray-800 bg-opacity-80 transition duration-700 ease-in-out w-full p-4 overflow-x-visible inset-0 h-full"
          : ""
      }`}
    >
      <div
        className={`inset-y-0 right-0 bg-blend-multiply overflow-x-visible overflow-y-auto w-2/4 fixed bg-white  h-full z-50 transition  ${
          detailed ? "translate-x-0" : "translate-x-full"
        } duration-700 ease-in-out`}
      >
        {isPending && (
          <div className="grid place-items-center z-50 fixed bottom-0 left-0 right-0 top-0 bg-gray-500 bg-opacity-60">
            <div>
              <ScaleLoader color="#FFD700" />
            </div>
          </div>
        )}
        <div className=" z-50 sticky top-0 inset-x-0  bg-gray-200">
          <div className="flex justify-between place-items-center p-5">
            <div className="flex place-items-center">
              <div>
                <img
                  className="h-14 w-14 rounded-full object-cover"
                  src={apiData && apiData.image}
                  alt=""
                />
              </div>

              <div className="px-4">
                <div className="font-bold tracking-widest text-lg">
                  {apiData && apiData.name}
                </div>
                <div className="font-bold uppercase text-sm text-gray-500">
                  {apiData && apiData.job_title} - Fulltime
                </div>
                <div className="font-bold uppercase text-sm text-gray-500">
                  {apiData && apiData.stage}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-1 flex place-items-center gap-3 bg-white rounded-md text-gray-500 font-semibold text-sm">
                <AiOutlineMail /> Send email
              </button>
              <button className="px-4 py-1 flex place-items-center gap-3 bg-white rounded-md text-gray-500 font-semibold text-sm">
                {" "}
                Send Message
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-5 px-10 pb-1">
            <div className="relative">
              {snooze === "" ? (
                <button
                  onClick={() => setdropsnooze(!dropsnooze)}
                  className="border border-black rounded-md text-sm font-bold px-6 py-1"
                >
                  Snooze
                </button>
              ) : (
                <button
                  onClick={() => setdropsnooze(!dropsnooze)}
                  className="border border-black rounded-md text-sm font-bold px-6 py-1"
                >
                  Snoozed: {snooze}
                </button>
              )}
              {dropsnooze && (
                <div className="absolute z-50 border-2 w-full bg-white grid grid-cols-1 divide-y">
                  <div
                    onClick={() => {
                      setsnooze("1 Months");
                      setdropsnooze(false);
                    }}
                    className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                  >
                    1 Months
                  </div>
                  <div
                    onClick={() => {
                      setsnooze("3 Months");
                      setdropsnooze(false);
                    }}
                    className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                  >
                    3 Months
                  </div>
                  <div
                    onClick={() => {
                      setsnooze("6 Months");
                      setdropsnooze(false);
                    }}
                    className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                  >
                    6 Months
                  </div>
                  <div
                    onClick={() => {
                      setsnooze("1 Year");
                      setdropsnooze(false);
                    }}
                    className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                  >
                    1 Year
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <div onClick={() => setdropstatus(!dropstatus)}>
                {status === "Fail" ? (
                  <div className="border border-black flex justify-between gap-3 px-6 py-1 text-sm place-items-center bg-black rounded-md">
                    <div className="font-bold text-white">Fail</div>
                    <div className="grid text-white font-bold place-items-center">
                      <BsChevronDown />
                    </div>
                  </div>
                ) : (
                  <div className="border text-white border-black bg-black px-6 py-1 justify-between gap-4 text-sm font-bold flex  place-items-center rounded-md">
                    {status}{" "}
                    <div>
                      <BsChevronDown />
                    </div>
                  </div>
                )}
              </div>
              {dropstatus && (
                <div className="absolute z-50 border-2 w-full bg-white grid grid-cols-1 divide-y">
                  <div
                    onClick={() => {
                      setstatus("Active");
                      setdropstatus(false);
                    }}
                    className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                  >
                    Active
                  </div>
                  <div
                    onClick={() => {
                      setstatus("Inactive");
                      setdropstatus(false);
                    }}
                    className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                  >
                    Inactive
                  </div>
                  <div
                    onClick={() => {
                      setstatus("Unverified");
                      setdropstatus(false);
                    }}
                    className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                  >
                    Unverified
                  </div>
                  <div
                    onClick={() => {
                      setstatus("Unresponsive");
                      setdropstatus(false);
                    }}
                    className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                  >
                    Unresponsive
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex z-40 sticky top-[124px] bg-white inset-x-0 px-10 border-b">
          <div
            onClick={() => settabs(1)}
            className={`text-sm uppercase cursor-pointer text-gray-500 font-bold px-3 py-2 ${
              tabs === 1 && "border-b-2 border-b-[#FFD700]"
            } `}
          >
            details
          </div>
          <div
            onClick={() => settabs(2)}
            className={`text-sm uppercase cursor-pointer text-gray-500 font-bold px-3 py-2 ${
              tabs === 2 && "border-b-2 border-b-[#FFD700]"
            } `}
          >
            resume
          </div>
          <div
            onClick={() => settabs(5)}
            className={`text-sm uppercase cursor-pointer text-gray-500 font-bold px-3 py-2 ${
              tabs === 5 && "border-b-2 border-b-[#FFD700]"
            } `}
          >
            Conversation
          </div>
          <div
            onClick={() => settabs(3)}
            className={`text-sm uppercase cursor-pointer text-gray-500 font-bold px-3 py-2 ${
              tabs === 3 && "border-b-2 border-b-[#FFD700]"
            } `}
          >
            hiring pipeline
          </div>
          <div
            onClick={() => settabs(4)}
            className={`text-sm uppercase cursor-pointer text-gray-500 font-bold px-3 py-2 ${
              tabs === 4 && "border-b-2 border-b-[#FFD700]"
            } `}
          >
            interviews
          </div>
        </div>
        <div className={`${tabs === 3 ? "" : "hidden"}`}>
          <div class=" py-8">
            <div className="container mx-auto">
              <dh-component>
                <div className="w-full px-10">
                  <div className="bg-gray-200 h-1 flex items-center justify-between">
                    <div className="w-1/3 bg-orange-600 h-1 flex items-center">
                      <div className="bg-orange-700 h-6 w-6 rounded-full shadow flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-check"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#FFFFFF"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M5 12l5 5l10 -10" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-1/3 flex justify-between bg-orange-700 h-1 items-center relative">
                      <div className="absolute right-0 -mr-2">
                        <div className="relative bg-white shadow-lg px-2 py-1 rounded mt-16 -mr-12">
                          <svg
                            className="absolute top-0 -mt-1 w-full right-0 left-0"
                            width="16px"
                            height="8px"
                            viewBox="0 0 16 8"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              id="Page-1"
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <g
                                id="Progress-Bars"
                                transform="translate(-322.000000, -198.000000)"
                                fill="#FFFFFF"
                              >
                                <g
                                  id="Group-4"
                                  transform="translate(310.000000, 198.000000)"
                                >
                                  <polygon
                                    id="Triangle"
                                    points="20 0 28 8 12 8"
                                  ></polygon>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <p
                            tabindex="0"
                            className="focus:outline-none text-orange-700 text-xs font-bold"
                          >
                            Stage 3: Interview
                          </p>
                        </div>
                      </div>
                      <div className="bg-orange-700 h-6 w-6 rounded-full shadow flex items-center justify-center -ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-check"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#FFFFFF"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M5 12l5 5l10 -10" />
                        </svg>
                      </div>
                      <div className="bg-gray-200 h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="h-3 w-3 bg-orange-700 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-1/3 flex justify-end">
                      <div className="bg-gray-200 h-6 w-6 rounded-full shadow"></div>
                    </div>
                    <div className="w-1/3 flex justify-end">
                      <div className="bg-gray-200 h-6 w-6 rounded-full shadow"></div>
                    </div>
                  </div>
                </div>
              </dh-component>
            </div>
          </div>

          <div>
            <Link to="/applicantval"
                  className="font-bold">
              Generate Offer Letter
            </Link>
          </div>

          <div className="border rounded-md my-4 px-14 py-4">
            <div className="flex justify-between">
              <div className="border px-4 font-bold">Details</div>
              <button className="px-4 py-1 text-green-800 font-bold text-sm border border-green-800 rounded-md">
                Move Next Status
              </button>
            </div>
            <div className="flex gap-32 my-6">
              <div className="space-y-2">
                <div className="font-bold text-sm text-gray-500">
                  Current Status
                </div>
                <div className="bg-green-800 text-white font-bold text-sm px-1 py-1 text-center rounded-full">
                  Active
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-sm text-gray-500">Assignee:</div>
                <div className="font-bold">Yash Barman</div>
              </div>
            </div>
            <div className="flex gap-32 my-6">
              <div className="space-y-2">
                <div className="font-bold text-sm text-gray-500">Stage:</div>
                <div className="font-bold">InterView</div>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-sm text-gray-500">Owner:</div>
                <div className="font-bold">Yash Barman</div>
              </div>
            </div>
            <div className="flex gap-32 my-6">
              <div className="space-y-2">
                <div className="font-bold text-sm text-gray-500">Date:</div>
                <div className="bg-orange-800 text-white font-bold text-sm px-2 py-1 text-center rounded-full">
                  08 Feb 2023
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-md my-4 px-14 py-4">
            <div className="flex justify-between">
              <div className="font-bold border px-4 py-2">Notes</div>
              <button className="px-2 py-1 text-sm border border-gray-500 text-gray-500 rounded-md">
                Add Notes
              </button>
            </div>
            <div className="overflow-auto scrollbar-thin scrollbar-thumb-[#FFD700]  scrollbar-track-white my-3">
              <div className="flex place-items-center my-2">
                <div>
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBERERURERIREREPEREREBEPERESERERGBQZGRgUGBgcIS4lHR4rIRgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QGhISGjQhISExNDQ0MTY1NjQxNDQ0NDQ0MTExNDE0NDE2MTE0MTQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQxMf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAACAwAEAQUHBgj/xAA+EAACAQIEAwYDBQcCBwEAAAABAgADEQQSITEFQVEGEyJhcYEHMpEjUoKhsRRyksHR4fBCwiQzQ1Nic6IV/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAfEQEBAAICAwEBAQAAAAAAAAAAAQIRAzESIUEyQlH/2gAMAwEAAhEDEQA/ALdOWEERTllJ1YMQR6iLQR6iQEojVEFYxRAJRDUSKIxRAyojAJhRCAkEAhASAQwIaYAhATIWEFgQCTLCAmTAC0loOJxCUkapUZadNFLO7myqo3JM8BjPiMXcphKWZB/1KpALa7qhI09YHQrSWnN27c4qnqy020vZlH+0zYYD4iUWOWvTZOroc4Hnl3t9YHuLSWi8HiqdZBUpOtRGGjKbj08j5R9oCyJCIy0wRAXaYIhkTBEBZExaMIgEQAIgkRhEAiABEEiGRBMMlMIpo5oppQgpMw5IGgpiWUERTEs0xKHII9YpRHKJAaCOUQEEaogEojVEFRGKJGmQIQEgEMCBAIYEgEICBAIQEyBCAgYtIRCtNb2jxbUcJXqJ860ytP8A9jkIn5sIHI+13F8RxHGPh6RqNQpuyU6KfIxQ2NRxsTfmdtLSzgezWLRNcq3GgCn87bz1HZfg6UF2GdgAxO9hsL+5PqZ7GhRUDaeXPly8tR68OHHxly+uP4/gWJVQ4TOCbEpZl/sZSPZquVz2Kkbb6eRE7RiMEj62seZXQn1muxFAWtb8t5m82TePDja5LwPjeL4XWLKC1IsBWpH5XUcx0bofrpO48NxtPE0Ur0jmp1UDodjY8iORGxHlOX8ewozmw01uLTdfC/iwyvgGAHdF6tG3/bLAup9GcEevlO3Hn5R5+bi8b6e/ktCtMTs4hIgkRkEiAsiYIhkQSIAGARGkQCICyIJEMiC0BTxLRzxTQyVeSCZJRpactLK1OWklDlj0iVj0EgcojUEBYxRDQ1hrMKIYEgIRgEFRDUQMgQwJgCGBAgEICQCZAgZtND2ycDCFTez1aSkDdgGz5ffJN/aeY7aYgd3lS7PScO4VScgZSFY2k3pZLelLgeIDL3j6ZycijmBoT7mbaj2jwiP3b1UVr2sTsehnnMM48CZKhSlRR2TKVFRibKB95RZiR+75g63iuCbE1gDSVaWS6vnHiey2TKNiLsDpyGpvPL63bXu1bjJHTQ6N4kYFT0M1+OamgJZgL6m/Seb7MpWoO+GAFT7FaqCrUZBTGYqVuFY20Fh59J5Lj+KrYzFNQJ7rIwpt4mdFINixNhp7RqVndxbDjmJpnMadRWNyLAi81HYSs1PidHlnNSm3mrI1v/oD6TTYjCikljTZGD5QzNfPpcm1ttZZ7PYoUMfhqjuERHps7toFQk+I+zH6GdMMZj05cuVynt3y0wRBw9ZKiK9Ng6OodHU3VlIuCIydnnLkIhGYMoAwTDIgmABEAiGYJgAYto0xTQFPFPGtFPDJMxMzEo01KWklWnLSSixTllJXpywkgcsagi0jVkaGohqIKxggGIawVENRAICGBMCGIGAIQkAhCQS01HEaIbvQAC7oFF/NdSfYTcCUuIYcmzrckaOBe5XkdOl5jkm56deLKTL39aKlh2cU61MAvTQoyXAFSm1iVB2DAqCCdNxpe42OHxSEG9OqjAeJWoupv0z2yn1DW85R4XV7sd3Y+Aldd7DabKtxOjTW9RlG84Y35Xpu+4Tw+kWqPWK5TUVURfu0kJsPUlmP06TneNVaXFKua7U6puWUZijka6DcaT0nEqhZ2rU/2hntlpgVXRUBIBIRdGPivcgzn1ValDFMKjvfvc5qPdiwHLyvrKbkeo4hQw2RnzUb5dWXKWt6DW/+aTwPGKyM91GUZfCDuAFCi/nZZ6jtJxCm6L3bXFuW20p9jOzv/wCjiwXB/Z8OFesbaMP9NK/Vuflfylx9xnks37dg7N0cmCwybZMLhwQdwe7W82UK0wRPQ8lYMEwpgyoAwTDMAwAMEwzAMADFNGtFNASYpoxolzAXeSCWmZWWmSWqZlNDLVOUXKcsrKtOWUkD0jliUjkkaMWMEBYxYBKI0QFhiAYhCYEyJAYmZgTIgZEzIJmB5PjVPuqzOdEcZwR1O/5gzTYnBtiSHBcBANENi7Xva9tLT0HaymxemRs6Oh+6SLEA/Ukek8pwviz0HenWQqL3VuW/5C36Tz5Yy5XT1Y5WYy1MWq00OfA4ip4rNVDuxIHXXNPIY3DivUApUqtBHI0ctlUfum5nuMd2hp6Xq01ufDZxa17XnnOMccp00OVkdztaza6b2MsxrWXLLjrbQPg2fEJhKQLvdaYAN8zsb3vyGvtO88G4cuFw9LDptSRUJAtma3ib3NzOTfCSi1biD1n8Zp0HdnPJ3ZVUD1Bf6Ts864x5srWIJhGCZpgJkMhmDKBMEwmgGABgtMtAYwBYxTmGxinMBTxLxjGKeGVcvMQ8oklGkQy5TlJN5dpyi3TlpJUpyykgsJHLErGrI0esYsSsapgNWGIsQ1gMEIQRMgwDEISjj+KYfDLmr1qdIcg7gMfRdz7TyPFPiZhadxhqb4huTP8AZU/zBY/SJLTb3wmn4z2nweDH29ZQ/Kml6lQ/hXb1NhORcY7Z8Qxdw1XukP8A08PemtvNr5j7m084409d/XrNTH/U27x2b4gOKUa9VgVpnEZKCkDNTVEQgm27EsxPkbcpruMcMGYpUWzW0I5jqD0ifg5Uvhayfdrhv4qaj/YZ6rj1fDkZKl3dDoKZGdCRe5PIW5c+m04cuG767duLk8fV6ch49wPJ40qNroL2bXpNJQ7K4rEElQci/PUc2RB5nmfIazrC4LBVaoFTEeFNSjJ3Zve2VmJ036e83HFVoYag1RwqUsOjNlUWAA5AdSdOpJkwxy/pvkzx/lxanxVuDYqgaADugqGurXUVUcBcrW2HhuOhUGdW7M9uMFxABUfua+xw9dlVyf8AwN7OPTXqBODcWxLYiu9Vt6jFrclHJR6DSV+729Z38Xnt2+pzMEzh3APiFjsIoSoRiqSiwWuzCoo6LUFz/EGnReC9vuH4oANU/Zqmxp4khBf/AMX+U/UHykuNNvUkzBMwrggEEEEXBBBBHUGYJgYJgEzJMAmBhjFsYTGLYwBYxTGGxinMAGMS5hOYpmlZDeSDeSBpKcuUzKSS3TlF2mZZQypTMsoZBaUxqmIUximGlhYxTFKYamQPUwxFKYwGAwGct7d9qsWuKq4WjUejSo5Ebu/BUdyoYtnHiA8QFgRtzvPVduePvgcMrUSgrVagRM4zWUAlmA200Gums47Xqu7O9Rmeo5LO7m7M3Umaxn1KxUdmJZmLMd2YlmJ8yd4B0hKJiqNJ0RlfXXpzhZbyLTuNdfKMAge7+FeMdatfDISrYhKZDgAimKYe7W6nMAP7T1vFuDJhFWrTLMjsVrmoQ7Fnuc5LddQb6XIPWeG+F9TLxNV+/Qqr9Mp/lOkdq8WoprRvq7gsAC3gTckAg7kfTynLL9NTpzviOJrNWGGwyl6jm4scxsy6EeIhtBu2ljE9t8RXwuGo8NqVmquQK1cE5u7U6U6OfdgLFtfLlaen7DPSFXHYqpvQFMZ2NyiKhLannYDmdt5zDjfEWxeKq4h96zlrH/Suyr7KAPaXH3UrTkazLC38Q/WHUXWAijMNN9us0g3WAVjjBKf5rA2HBO0OLwZ/4eqyLe5pv46J9UOg9RY+c6X2Y+IdDFuuHrL3OIc5VYa0aj8lDHVSeh9LzjtdiosASZWV3Uh1YBkIYZd1Km4P1EzVj6fJgMZEe6g9QD9RBYzKhYxZMImAxlAsYlzDYxbGAlzEsYxzK7mGWM0kTnkga1JbpmUqZlqmZRcpmWUMpoZZQyC2hjlMrIY5TDSwpjFMQpjFMB6mNUyupg43FLRpPVb5aSO7X6KpP8pByb4gcR/aMe6A3p4YCgg5Zt3b1zG34BPNZ7XU8xoZDUZ2Z31d2Z2PVmNz+ZMxX89uvSdZ6jIkOvrYwn1+sWh+U+3lpGqd5QVOGII0hCBv+wlXJxTCm/zVGQ/iRh+tp7LH4xqj1He5R3+ztYhRnIQ3Oh+a+u15zfhWM/Z8TRr8qNZHNul7H8jPeomTDghFcZRo2qZrWzk3N1LNrpfaYy7WNBiOIdxgcVTU/aYzFJSa1791TUu+5JIJdV8w08io/OWOIODUbLa2b/T8pNgCwHna8Uo0lxnoqtV01Ow5xNBLkueeig8h19YzEeJrcgdfM9IRIUEnlCI29pKmn6wcPrdjAevvYZmJyqPIbn6ky7CKqjdjp0vp/eJzG3hGRep3PpLHc63Y5m89h6CLqzNHeOw+NFbhuGcXutIUmuSTnp+Am565b+83ZM8H8I65bBVUJ/5eJa3kHRT+t57kmZaRjFMYTGKYwMMYpzCZol2hkDmIcw3MQ7QFlJJi8zA1dMy1TMo0zLdMyi6hlhDKaGPRpBcRo5GlRGj0aGlpTGKZXVo1WgWFM0Hb1yOG17PkuKanS+YNVQFfe9vebpWnkPibWcYREX/l1KyiobX+VSyKfcX/AAiJ2y5iNRv7cv7RbVG2+YdDo315ywlj/XaLrUTf5vTQX/p+U6jGHNxoLWbYixjlbWVaQIYgkm/p/KOJ/wA0gPuYStFK3+aTKGBnEfKfS897xXHlaCOWI+zputggLEBXUDyvlFwSNee88C50m14jxLPg8Oo2FMI17XLU7oxJB1vZNxM0ahTc9YbvbQbnbnYdfb+kTTawvBVr69dttoEuAedhtz/WV8RUzELsAQT56xlRjKiG7HeK0ud7lQn1iMNoLgZifmZjZeth5QMQb5UW55tvtHgNawQ6feIH95Pohcb3Fh9PrKdapfbbrH1lA3Fz9RKlU+RktSOofB2p9nil5h6LW9Qw/lOjsZzr4S8OKUauJz+GuwpCnb/t65i34yLWnv2aZissYtmkZolmlZZZop2kZop2gC7SuzTNRpXd5QWaSJzyQKFMy1TMpU2lpGgXEaOUyqjR6mBZRo9WlRDHoZBZRo1WlZTGq0NLKtPE/E/GWo0KAJu9VqrAfdRSov7uP4Z7JTOYfEHF95je7B0w9JE/E3jP5MsuPbLzyrcXGkw4PX9f6yU20t/WYqNp/nlOgqO9mB840vzlPFP+ois8ztdNmlUcjGk/0mmD5dRNhQrZliXZo930lam5yAHmWIHQEwK1XQ9eUgYD0UWhDmN/CPxekyze0RTfS/M6+3KSo+kDFZ7/AOf2iaRtrFs9zMZr+EczaZ20u4VP9XNtdeQ5CPdwBBpjT02mHTnp6kzTJDnmZXcBvve0dVf3PQCV6jseVhMVp1/4ZmoOHgOmVO9c0W2LoTqSP3swv5T1bNNN2TTLw/DC1vsEb+IZr/nNqzRGUZostMM0W7yjLPEO8wzxDPAlR5Wd4TvK7tAz3kkrZ5ICabSyjSlTaWUaBdRo9WlFHlhHgXEaORpURo5WgXEaNVpTRo9GkFhWnGOLYk1cTWqnXPVqEb/LmIUfQCdjRpw7GYgCrUGpvUqEZRcgFjNYhyv7GLqPpEqXb5WK/vLAqMyjxkG/3b3/AEl2MU8O1aoqLqztYdAOZ9ALme1w3YWlUQWZ05d43iZj0C7e00/YmgGrO7a5Qqr+I3P6D6zsHZ7AGoSbKVByBWF/Dvm1/wA0nmy3llqXWnpnjjhuzdri3FezDUiRSqd+Ba1qZRjc2tYnz9zp0vqsndkqxAOxFwbH1E77294dQSihAValWolNLAKzFr3Jtv8A3lzFYbC4PAVcRXo03Ap5mR6aHPyp0tRbUkD1bynSXV1252bm+nzgHu3veSvU0tzO/pNhiKId2fKiFmZitNQiLmN8qryUbCVHwpve95uy6YBSFoFapDseQvLNLgOLezLRezAFSbAEHY6mTKyRcZb1GsvLGCpktfkJ7XgfYpdGxDXa/wAgPhHqef6TS9oK1NcRURLLTpN3SKumiaHQdTmPvOeOUyvr43lx3HHd+q6+35TDiADYb6cucRVq3+8fTSdrXMupVJNkF+p5RPdMxC3zMxACjcsdAJlqjDZbCbTshhDXx9BSCQj943kE8X6gD3mLR2nDJ3dNKf3ERNNvCoH8plngs8U7zTI3eJd4DvEu8AneJd4LvEu8CO8Q7yO8rVHgTPJK95JAVJo9WkklDkaPRpJID0aPR5JIDleMV5JIDcxtpvbT1nEaFQkDnexJ5k9ZJJYCatocuw3Y+W9hFoBpbdhe7am0zJAv8KxVTDFitjnA35W5+us23Du3GPwlW61cyZSClSzaC5Cg5dLcv12tJJmybb3em/4NxurxjiNJ6xJpUWC0l8IuxtmcgWte17enSek+MeNK0MPQBP2tR6h81RbAH3e/tJJOeH6ref5jkbETFtZJJ2cyEpglj0OUeQ0/rLtHHYikPBWqKBZSubMoA0Fg17ctpiSSyXsls6bBO0+LWwvSaw+ZkOZtOdiB9AJocSneVKjkANUZ6nUAlr2F/WSSJhjOi55ZdgR9CrbqbXHWZbQ7/WSSBUr1Ok9r8MsN4q9cjUBKS+/ib9FkkmZ2Xp713iHeSSaZDminaSSAh2inaYkhCGaIqNJJCkZpJJIR/9k="
                    alt=""
                  />
                </div>
                <div className="px-5 w-full">
                  <div className="flex justify-between">
                    <div className="font-bold ">Yash Barman</div>
                    <div className="font-bold text-gray-500 text-sm">
                      13 feb 2023 . 04:30 Pm
                    </div>
                  </div>
                  <div className="tracking-wider">
                    Candidate successfully moved to the interview stage.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${tabs === 1 ? "p-4 " : "hidden"}`}>
          <div className="border rounded-md">
            <div>
              <div className="font-bold px-6 py-2">Basic Information</div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
            <div className="px-6 py-2 grid grid-cols-2 gap-3">
              <div>
                <div className="font-bold text-sm text-gray-500">Name</div>
                <div className="font-bold">{apiData && apiData.name}</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Email</div>
                <div className="font-bold">{apiData && apiData.email}</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Origin</div>
                <div className="font-bold">Sourced</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Phone</div>
                <div className="font-bold">
                  {apiData && apiData.phonenumber}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Candidate Id
                </div>
                <div className="font-bold">{apiData && apiData.id}</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Website</div>
                <Link
                  to="https://yash-portflio-3010.vercel.app/"
                  className="font-bold"
                >
                  {apiData && apiData.website}
                </Link>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Address</div>
                <div className="font-bold">{apiData && apiData.origin}</div>
              </div>
            </div>
          </div>
          <div className="border rounded-md mt-5">
            <div>
              <div className="font-bold px-6 py-2">Professional Details</div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
            <div className="px-6 py-2 grid grid-cols-2 gap-3">
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Current Job Title
                </div>
                <div className="font-bold">{apiData && apiData.job_title}</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Higest Qualification Held
                </div>
                <div className="font-bold">
                  {apiData && apiData.highest_qualification}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Expected Salary
                </div>
                <div className="font-bold">
                  {apiData && apiData.expected_salary}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Current Salary
                </div>
                <div className="font-bold">
                  {apiData && apiData.current_salary}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Experience in years
                </div>
                <div className="font-bold">
                  {apiData && apiData.experience} years
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Linkedin</div>
                <Link
                  to="https://in.linkedin.com/in/yash-barman-20185921a?trk=public_profile_browsemap"
                  className="font-bold"
                >
                  {apiData && apiData.linkedin}
                </Link>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Skills</div>
                <div className="flex my-2 gap-2">
                  {apiData.skills &&
                    apiData.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="rounded-full bg-gray-300 text-sm font-bold p-2 text-md text-gray-500"
                      >
                        {skill}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${tabs === 2 ? "p-4 " : "hidden"}`}>
          <div className="border rounded-md">
            <PdfViewer />
          </div>
        </div>
        <div className={`${tabs === 5 ? " " : "hidden"}`}>
          <div className=" absolute top-[160px] bottom-[114px] w-full p-2 overflow-auto">
            {messages &&
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`space-y-1 my-1 grid ${
                    message.myMsg ? "justify-items-end" : "justify-items-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shadow-lg inline-block max-w-sm  ${
                      message.myMsg ? "bg-green-100 text-green-800" : "bg-white"
                    }`}
                  >
                    {<div dangerouslySetInnerHTML={{ __html: message.body }} />}
                  </div>
                  <div className="text-sm ">
                    {timeAgo.format(message.timeStamp)}
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
        <div className={`${tabs === 4 ? "px-6 py-4 " : "hidden"}`}>
          <div className="flex justify-between">
            <div className="font-bold">Interview List</div>
            <button
              onClick={() => setmodal2(true)}
              className="border border-green-800 text-green-800 font-bold text-sm px-4 py-1 rounded-md"
            >
              + Add Schedule Interview
            </button>
          </div>
          {!isIntPending ? <div className="space-y-2">
            {interviewData &&
              interviewData.map((data) => (
                <div key={data.id} className="my-5">
                  <div className="flex justify-between my-1">
                    <div className="font-bold text-sm text-gray-500">
                      {data.date}
                    </div>
                    <div className="flex place-items-center gap-4">
                      <AiOutlineEdit 
                      onClick={()=>updateInterview(data.id)}
                      className="cursor-pointer" />
                      <AiOutlineDelete
                        onClick={() => deleteInterview(data.id)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="border grid grid-cols-4 place-items-center rounded-md border-l-4 border-l-[#FFD700] px-4 py-2">
                    <div className="flex place-items-center">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src="data:image/jpeg;base64,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"
                        alt=""
                      />
                      <div className="pl-4">
                        <div className="font-bold text-sm">
                          {data.official_name}
                        </div>
                        <div className="font-bold text-sm text-gray-500">
                          {data.stage}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-sm">03:00 - 04:00 PM</div>
                      <div className="font-bold text-sm text-gray-500">
                        1 Hour Interview
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-blue-500 cursor-pointer">
                        {data.meeting_link}
                      </div>
                      <div className="font-bold text-sm text-gray-500">
                        Scheduled by -{" "}
                        <div className="font-bold text-sm"> Yash Barman</div>
                      </div>
                    </div>
                    <div>
                      <button className="border border-green-800 bg-green-800 text-white font-bold text-sm px-4 py-1 rounded-md">
                        Submit Feedback
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>:<div className="grid place-items-center h-96 bg-white">
          <div><ClockLoader color="#FFD700" /></div>
        </div>}
        </div>
        <button
          className="bg-gray-300 py-2 fixed top-2/4 left-0 my-auto"
          onClick={() => func(false)}
        >
          <HiOutlineChevronRight className="h-5 w-5 " />
        </button>
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
                    {tempDataArray.map((data) => (
                      <div key={data.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between place-items-center">
                          <div className="font-semibold tracking-wider">
                            {data.title}
                          </div>
                          <div>
                            <button
                              onClick={() => sendTemplate(data.id)}
                              className="rounded-full px-4 py-2 border bg-gray-100 font-bold text-sm text-gray-600 hover:bg-blue-500 hover:text-white"
                            >
                              Use
                            </button>
                          </div>
                        </div>
                        <div>
                          <div
                            dangerouslySetInnerHTML={{ __html: data.body }}
                          />
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
                          onChange={(e) => settitle(e.target.value)}
                        />
                      </div>
                      <div className="font-bold">Design Body</div>
                      <DefaultEditor
                        value={content}
                        onChange={(e) => setcontent(e.target.value)}
                      />
                      <div className="grid place-items-end">
                        <button
                          onClick={createTemplate}
                          className="font-bold text-sm bg-blue-500 px-6 py-2 rounded-md text-white"
                        >
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
      {modal2 && (
        <div className="fixed grid place-items-center top-0 bg-gray-500 bg-opacity-80 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
          <div className="relative w-full h-[500px] max-w-4xl  ">
            <div className="relative bg-white h-full rounded-lg shadow overflow-auto">
              <div className="p-6 space-y-7">
                <div className="font-semibold text-xl text-center tracking-widest">
                  Schedule an Interview for Candidate
                </div>
                <div className="relative w-2/4">
                  <div className="font-bold">Official</div>
                  <div onClick={() => setdropofficial(!dropofficial)}>
                    {officail === "" ? (
                      <div className="flex justify-between p-2 place-items-center bg-gray-100 border rounded-md">
                        <div className="font-bold text-gray-400">
                          Select Officail
                        </div>
                        <div>
                          <BsChevronDown />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-100 p-2 border flex justify-between place-items-center rounded-md">
                        {officail}{" "}
                        <div>
                          <BsChevronDown />
                        </div>
                      </div>
                    )}
                  </div>
                  {dropofficial && (
                    <div className="absolute z-10 border-2 w-full bg-white grid grid-cols-1 divide-y">
                      <div
                        onClick={() => {
                          setofficail("Yash Barman");
                          setdropofficial(false);
                        }}
                        className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                      >
                        Yash Barman
                      </div>
                      <div
                        onClick={() => {
                          setofficail("Vishal Jaiswal");
                          setdropofficial(false);
                        }}
                        className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                      >
                        Vishal Jaiswal
                      </div>
                      <div
                        onClick={() => {
                          setofficail("Mridul Singhal");
                          setdropofficial(false);
                        }}
                        className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                      >
                        Mridul Singhal
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="font-bold">Meeting-link</div>
                  <input
                    className="focus:outline-0 px-4 py-2 rounded-md w-3/4 border bg-gray-100"
                    type="text"
                    placeholder="Enter Meeting link"
                    value={meetlink}
                    onChange={(e) => setmeetlink(e.target.value)}
                  />
                </div>
                <div className="relative w-2/4">
                  <div className="font-bold">Stage</div>
                  <div onClick={() => setdropstage(!dropstage)}>
                    {officail === "" ? (
                      <div className="flex justify-between p-2 place-items-center bg-gray-100 border rounded-md">
                        <div className="font-bold text-gray-400">
                          Select Stage
                        </div>
                        <div>
                          <BsChevronDown />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-100 p-2 border flex justify-between place-items-center rounded-md">
                        {stage}{" "}
                        <div>
                          <BsChevronDown />
                        </div>
                      </div>
                    )}
                  </div>
                  {dropstage && (
                    <div className="absolute z-10 border-2 w-full bg-white grid grid-cols-1 divide-y">
                      <div
                        onClick={() => {
                          setstage("Screening");
                          setdropstage(false);
                        }}
                        className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                      >
                        Screening
                      </div>
                      <div
                        onClick={() => {
                          setstage("Interview");
                          setdropstage(false);
                        }}
                        className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                      >
                        Interview
                      </div>
                      <div
                        onClick={() => {
                          setstage("Hr");
                          setdropstage(false);
                        }}
                        className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                      >
                        Hr round.
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="font-bold ">Select Date And Time</div>
                  <input
                    className="font-bold p-2 w-2/4 bg-gray-100"
                    type="datetime-local"
                    value={timeAndDate}
                    onChange={(e) => settimeAndDate(e.target.value)}
                  />
                </div>
                <div className="py-2 flex">
                  {!updateBtn ? <button  onClick={scheduleInterview}  className=" justify-end font-bold text-sm text-white bg-green-800 px-6 py-2 rounded-md">
                    Schedule
                  </button>:
                  <button onClick={()=>updateCurrInterview()} className=" justify-end font-bold text-sm text-white bg-green-800 px-6 py-2 rounded-md">
                  Update Interview
                </button>
                  }
                  <button
                    onClick={() => setmodal2(false)}
                    className="font-bold text-sm text-gray-500 px-6 py-2 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDetailed;
