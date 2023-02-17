import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { DefaultEditor } from "react-simple-wysiwyg";
import Myfb from "../components/formbuilder/Myfb";
import { scoreCardData } from "../data/dummy";

const NewJob = () => {
  const [step, setstep] = useState(1);
  const [department, setdepartment] = useState(0);
  const [dropdepartment, setdropdepartment] = useState(false);
  const [jobType, setjobType] = useState(0);
  const [dropjobType, setdropjobType] = useState(false);
  const [drophr, setdrophr] = useState(false);
  const [hr, sethr] = useState(0);
  const [droplocation, setdroplocation] = useState(false);
  const [currency, setcurrency] = useState("0");
  const [dropcurrency, setdropcurrency] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [location, setlocation] = useState(0);
  const [content, setcontent] = useState("");
  const [newPipeline, setnewPipeline] = useState("");
  const [pipeline, setpipeline] = useState([]);
  const [dropone, setdropone] = useState(0);
  const [INTELLECTUAL, setINTELLECTUAL] = useState(0);
  const [PERSONAL, setPERSONAL] = useState(0);
  const [INTERPERSONAL, setINTERPERSONAL] = useState(0);
  const [MANAGEMENT, setMANAGEMENT] = useState(0);
  const [LEADERSHIP, setLEADERSHIP] = useState(0);
  const [MOTIVATIONAL, setMOTIVATIONAL] = useState(0);
  const [cardCategory, setcardCategory] = useState("");
  const [dropCategory, setdropCategory] = useState(false);

  const [taggs, setTags] = useState([]);
  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...taggs, event.target.value]);
      event.target.value = "";
    }
  };

  const removeTags = (index) => {
    setTags([...taggs.filter((tag) => taggs.indexOf(tag) !== index)]);
  };

  const deletePipeline = (id) => {
    let accCopy = pipeline.filter((acc) => acc.id != id);
    setpipeline([...accCopy]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let element = {
      id: Math.floor(Math.random() * 100 + 1),
      body: newPipeline,
    };

    setpipeline([...pipeline, element]);
    setnewPipeline("");
  };

  return (
    <div className="bg-gray-200 px-6 py-4">
      <div className="flex justify-between place-items-center mb-5">
        <div className=" text-3xl tracking-widest text-gray-800 ">
          Add New Job
        </div>
        <div className="flex gap-6 place-items-center">
          <button className="text-sm text-gray-500 font-semibold">
            Save & Close
          </button>
          {step > 1 && (
            <button
              onClick={() => setstep(step - 1)}
              className="bg-white border border-green-800 text-green-800 rounded-md px-8 py-2 font-semibold"
            >
              Previous
            </button>
          )}
          {step <= 3 && (
            <button
              onClick={() => setstep(step + 1)}
              className="bg-green-800 text-sm text-white rounded-md px-8 py-2 font-semibold"
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button
              onClick={() => setsubmit(true)}
              className="bg-green-800 text-sm text-white rounded-md px-8 py-2 font-semibold"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {!submit && (
        <div className="bg-white rounded-xl">
          <div className="grid grid-cols-4 gap-3 p-4">
            <div
              className={`flex place-items-center gap-4  ${
                step >= 1
                  ? "border-2 border-green-800 bg-green-100"
                  : "border bg-gray-100"
              } rounded-md px-4 py-2`}
            >
              <button
                className={`rounded-full h-7 w-7 place-items-center  ${
                  step >= 1 ? "bg-green-800" : "bg-gray-500"
                } text-white p-2 flex`}
              >
                1
              </button>
              <div
                className={`font-bold  ${
                  step >= 1 ? "text-green-800" : "text-gray-500"
                }`}
              >
                Job Details
              </div>
            </div>
            <div
              className={`flex place-items-center gap-4  ${
                step >= 2
                  ? "border-2 border-green-800 bg-green-100"
                  : "border bg-gray-100"
              } rounded-md px-4 py-2`}
            >
              <button
                className={`rounded-full h-7 w-7 place-items-center  ${
                  step >= 2 ? "bg-green-800" : "bg-gray-500"
                } text-white p-2 flex`}
              >
                2
              </button>
              <div
                className={`font-bold  ${
                  step >= 2 ? "text-green-800" : "text-gray-500"
                }`}
              >
                Application Form
              </div>
            </div>
            <div
              className={`flex place-items-center gap-4  ${
                step >= 3
                  ? "border-2 border-green-800 bg-green-100"
                  : "border bg-gray-100"
              } rounded-md px-4 py-2`}
            >
              <button
                className={`rounded-full h-7 w-7 place-items-center  ${
                  step >= 3 ? "bg-green-800" : "bg-gray-500"
                } text-white p-2 flex`}
              >
                3
              </button>
              <div
                className={`font-bold  ${
                  step === 3 ? "text-green-800" : "text-gray-500"
                }`}
              >
                Score Card
              </div>
            </div>
            <div
              className={`flex place-items-center gap-4  ${
                step >= 4
                  ? "border-2 border-green-800 bg-green-100"
                  : "border bg-gray-100"
              } rounded-md px-4 py-2`}
            >
              <button
                className={`rounded-full h-7 w-7 place-items-center  ${
                  step >= 4 ? "bg-green-800" : "bg-gray-500"
                } text-white p-2 flex`}
              >
                4
              </button>
              <div
                className={`font-bold  ${
                  step >= 4 ? "text-green-800" : "text-gray-500"
                }`}
              >
                Hiring Pipeline
              </div>
            </div>
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
          {step === 1 && (
            <div className=" py-4">
              <div className="px-10 text-2xl tracking-widest text-gray-800 ">
                Add Job Details
              </div>
              <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
              <div className="py-6 px-10">
                <form>
                  <div className="font-bold">Job Title</div>
                  <input
                    className="border-2 my-2 w-3/4 p-2 rounded-md"
                    placeholder="Enter your title"
                    type="text"
                  />
                  <div className="font-bold mt-5">Job Description</div>
                  <div className="py-4">
                    <DefaultEditor
                      value={content}
                      onChange={(e) => setcontent(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-10 p-y-4 w-3/4">
                    <div className="relative">
                      <div className="font-bold">Department</div>
                      <div onClick={() => setdropdepartment(!dropdepartment)}>
                        {department === 0 ? (
                          <div className="flex justify-between p-2 place-items-center bg-gray-100 border rounded-md">
                            <div className="font-bold text-gray-400">
                              Select Department
                            </div>
                            <div>
                              <BsChevronDown />
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-100 p-2 border flex justify-between place-items-center rounded-md">
                            {department}{" "}
                            <div>
                              <BsChevronDown />
                            </div>
                          </div>
                        )}
                      </div>
                      {dropdepartment && (
                        <div className="absolute z-10 border-2 w-full bg-white grid grid-cols-1 divide-y">
                          <div
                            onClick={() => {
                              setdepartment(1);
                              setdropdepartment(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Development
                          </div>
                          <div
                            onClick={() => {
                              setdepartment(2);
                              setdropdepartment(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Design
                          </div>
                          <div
                            onClick={() => {
                              setdepartment(3);
                              setdropdepartment(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Marketing
                          </div>
                          <div
                            onClick={() => {
                              setdepartment(4);
                              setdropdepartment(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Finance
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div className="font-bold">Hiring Manager</div>
                      <div onClick={() => setdrophr(!drophr)}>
                        {hr === 0 ? (
                          <div className="flex justify-between p-2 place-items-center bg-gray-100 border rounded-md">
                            <div className="font-bold text-gray-400">
                              Select HR Manager
                            </div>
                            <div>
                              <BsChevronDown />
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-100 p-2 border flex justify-between place-items-center rounded-md">
                            {hr}{" "}
                            <div>
                              <BsChevronDown />
                            </div>
                          </div>
                        )}
                      </div>
                      {drophr && (
                        <div className="absolute w-full z-10 border-2 bg-white grid grid-cols-1 divide-y">
                          <div
                            onClick={() => {
                              sethr(1);
                              setdrophr(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Yash Barman
                          </div>
                          <div
                            onClick={() => {
                              sethr(2);
                              setdrophr(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Mridul Singhal
                          </div>
                          <div
                            onClick={() => {
                              sethr(3);
                              setdrophr(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Visal Jaiswal
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div className="font-bold">Job Type</div>
                      <div onClick={() => setdropjobType(!dropjobType)}>
                        {jobType === 0 ? (
                          <div className="flex justify-between p-2 place-items-center bg-gray-100 border rounded-md">
                            <div className="font-bold text-gray-400">
                              Select HR Manager
                            </div>
                            <div>
                              <BsChevronDown />
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-100 p-2 border flex justify-between place-items-center rounded-md">
                            {jobType}{" "}
                            <div>
                              <BsChevronDown />
                            </div>
                          </div>
                        )}
                      </div>
                      {dropjobType && (
                        <div className="absolute w-full z-10 border-2 bg-white grid grid-cols-1 divide-y">
                          <div
                            onClick={() => {
                              setjobType(1);
                              setdropjobType(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Full-Time
                          </div>
                          <div
                            onClick={() => {
                              setjobType(2);
                              setdropjobType(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Part-Time
                          </div>
                          <div
                            onClick={() => {
                              setjobType(3);
                              setdropjobType(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            InternShip
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div className="font-bold">Location</div>
                      <div onClick={() => setdroplocation(!droplocation)}>
                        {location === 0 ? (
                          <div className="flex justify-between p-2 place-items-center bg-gray-100 border rounded-md">
                            <div className="font-bold text-gray-400">
                              Select HR Manager
                            </div>
                            <div>
                              <BsChevronDown />
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-100 p-2 border flex justify-between place-items-center rounded-md">
                            {location}{" "}
                            <div>
                              <BsChevronDown />
                            </div>
                          </div>
                        )}
                      </div>
                      {droplocation && (
                        <div className="absolute w-full z-10 border-2 bg-white grid grid-cols-1 divide-y">
                          <div
                            onClick={() => {
                              setlocation(1);
                              setdroplocation(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Banglore
                          </div>
                          <div
                            onClick={() => {
                              setlocation(1);
                              setdroplocation(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Pune
                          </div>
                          <div
                            onClick={() => {
                              setlocation(1);
                              setdroplocation(false);
                            }}
                            className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                          >
                            Hyderabad
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold">Experiences in Years</div>
                      <input
                        className="border w-full bg-gray-100 my-2 p-2 rounded-md"
                        placeholder="Enter expericence"
                        type="number"
                      />
                    </div>
                    <div>
                      <div className="font-bold">Expected Salary</div>
                      <div className="flex relative place-items-center">
                        <div
                          className="w-1/4"
                          onClick={() => setdropcurrency(!dropcurrency)}
                        >
                          {currency == 0 ? (
                            <div className="flex justify-between p-2 place-items-center bg-gray-100 border rounded-l-md">
                              <div className="font-bold text-gray-400">
                                Currency
                              </div>
                              <div>
                                <BsChevronDown />
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-100 p-2 border flex justify-between place-items-center rounded-l-md">
                              {currency}{" "}
                              <div>
                                <BsChevronDown />
                              </div>
                            </div>
                          )}
                        </div>
                        {dropcurrency && (
                          <div className="absolute top-12  w-1/4 z-10 border-2 bg-white grid grid-cols-1 divide-y">
                            <div
                              onClick={() => {
                                setcurrency("USD");
                                setdropcurrency(false);
                              }}
                              className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                            >
                              USD
                            </div>
                            <div
                              onClick={() => {
                                setcurrency("INR");
                                setdropcurrency(false);
                              }}
                              className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                            >
                              INR
                            </div>
                          </div>
                        )}
                        <input
                          className="border w-3/4 bg-gray-100 my-2 p-2 rounded-r-md"
                          placeholder="Enter expericence"
                          type="number"
                        />
                      </div>
                    </div>

                    <div className="">
                      <div className="flex justify-between">
                        <div className="font-bold flex place-items-center">
                          Sills Set:
                        </div>
                        <div className="p-2 border rounded-md">
                          0{taggs.length}
                        </div>
                      </div>
                      <div className="border border-gray-500 p-6 rounded-lg">
                        <div className="grid grid-cols-3 gap-3">
                          {taggs.map((tag, index) => (
                            <div
                              className="grid place-items-center bg-gray-300 rounded-md"
                              key={index}
                            >
                              <div className="flex place-items-center gap-2 py-1">
                                <div className="font-bold tracking-wider ">
                                  {tag}
                                </div>
                                <IoMdCloseCircle
                                  onClick={() => removeTags(index)}
                                />
                              </div>
                            </div>
                          ))}
                          <input
                            className="rounded-md focus:ring-0 border-0 p-1 "
                            tabIndex={0}
                            type="text"
                            placeholder="Add Skills and enter"
                            onKeyUp={(event) => addTags(event)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="p-4">
              <div className="px-10 text-2xl tracking-widest text-gray-800 ">
                Create Application form
              </div>
              <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
              <div>
                <Myfb />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="p-4">
              <div className="px-10 flex justify-between">
                <div className=" text-2xl tracking-widest text-gray-800 ">
                  Costumize your scorecard
                </div>
                <div className="flex gap-4">
                  <button className="text-sm font-bold text-gray-500">
                    Cancel
                  </button>
                  <button className="text-sm text-white bg-green-800 px-6 py-1 rounded-md font-bold">
                    Save
                  </button>
                </div>
              </div>
              <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
              <div className="flex justify-between w-3/4 p-2 my-2">
                <div className="flex gap-4">
                  <div className="font-bold text-gray-500">
                    Intellectual:{INTELLECTUAL}
                  </div>
                  <div className="font-bold text-gray-500">
                    Personal:{PERSONAL}
                  </div>
                  <div className="font-bold text-gray-500">
                    Interpersonal:{INTERPERSONAL}
                  </div>
                  <div className="font-bold text-gray-500">
                    Management:{MANAGEMENT}
                  </div>
                  <div className="font-bold text-gray-500">
                    Leadership:{LEADERSHIP}
                  </div>
                  <div className="font-bold text-gray-500">
                    Motivational:{MOTIVATIONAL}
                  </div>
                </div>
                <div className="font-bold text-gray-500">
                  Total:
                  {INTELLECTUAL +
                    PERSONAL +
                    INTERPERSONAL +
                    MANAGEMENT +
                    LEADERSHIP +
                    MOTIVATIONAL}
                </div>
              </div>
              <div className="space-y-2">
                <div className="border-2 border-gray-500 rounded-md p-2 max-h-96 overflow-auto">
                  <div
                    onClick={() => setdropone(dropone === 1 ? 0 : 1)}
                    className="cursor-pointer p-4 font-extrabold text-lg tracking-wider w-full flex justify-between place-items-center"
                  >
                    <div className="flex gap-5">
                      INTELLECTUAL
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setINTELLECTUAL(scoreCardData.INTELLECTUAL.length)
                        }
                      />
                    </div>
                    <BsChevronDown className="h-5 w-6" />
                  </div>
                  <div
                    className={`${
                      dropone === 1 ? "visible" : "hidden"
                    } transition duration-300 ease-in-out`}
                  >
                    {scoreCardData.INTELLECTUAL.map((card) => (
                      <div
                        key={card.id}
                        className={` flex w-3/4 border px-10 place-items-center py-2 justify-between`}
                      >
                        <div className="flex gap-10 place-items-center">
                          <div>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                setINTELLECTUAL(
                                  e.target.checked
                                    ? INTELLECTUAL + 1
                                    : INTELLECTUAL - 1
                                )
                              }
                            />
                          </div>
                          <div>
                            <div className="font-bold text-lg">
                              {card.title}
                            </div>
                            <div className="font-semibold text-gray-500">
                              {card.subTitle}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-500">
                            MAR:{card.mar}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-gray-500 rounded-md p-2 max-h-96 overflow-auto">
                  <div
                    onClick={() => setdropone(dropone === 2 ? 0 : 2)}
                    className="cursor-pointer p-4 font-extrabold text-lg tracking-wider w-full flex justify-between place-items-center"
                  >
                    <div className="flex gap-5">
                      PERSONAL
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setPERSONAL(scoreCardData.PERSONAL.length)
                        }
                      />
                    </div>
                    <BsChevronDown className="h-5 w-6" />
                  </div>
                  <div
                    className={`${
                      dropone === 2 ? "visible" : "hidden"
                    } transition duration-300 ease-in-out`}
                  >
                    {scoreCardData.PERSONAL.map((card) => (
                      <div
                        key={card.id}
                        className={` flex w-3/4 border px-10 place-items-center py-2 justify-between`}
                      >
                        <div className="flex gap-10 place-items-center">
                          <div>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                setPERSONAL(
                                  e.target.checked ? PERSONAL + 1 : PERSONAL - 1
                                )
                              }
                            />
                          </div>
                          <div>
                            <div className="font-bold text-lg">
                              {card.title}
                            </div>
                            <div className="font-semibold text-gray-500">
                              {card.subTitle}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-500">
                            MAR:{card.mar}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-gray-500 rounded-md p-2 max-h-96 overflow-auto">
                  <div
                    onClick={() => setdropone(dropone === 3 ? 0 : 3)}
                    className="cursor-pointer p-4 font-extrabold text-lg tracking-wider w-full flex justify-between place-items-center"
                  >
                    <div className="flex gap-5">
                      INTERPERSONAL
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setINTERPERSONAL(scoreCardData.INTERPERSONAL.length)
                        }
                      />
                    </div>
                    <BsChevronDown className="h-5 w-6" />
                  </div>
                  <div
                    className={`${
                      dropone === 3 ? "visible" : "hidden"
                    } transition duration-300 ease-in-out`}
                  >
                    {scoreCardData.INTERPERSONAL.map((card) => (
                      <div
                        key={card.id}
                        className={` flex w-3/4 border px-10 place-items-center py-2 justify-between`}
                      >
                        <div className="flex gap-10 place-items-center">
                          <div>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                setINTERPERSONAL(
                                  e.target.checked
                                    ? INTERPERSONAL + 1
                                    : INTERPERSONAL - 1
                                )
                              }
                            />
                          </div>
                          <div>
                            <div className="font-bold text-lg">
                              {card.title}
                            </div>
                            <div className="font-semibold text-gray-500">
                              {card.subTitle}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-500">
                            MAR:{card.mar}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-gray-500 rounded-md p-2 max-h-96 overflow-auto">
                  <div
                    onClick={() => setdropone(dropone === 4 ? 0 : 4)}
                    className="cursor-pointer p-4 font-extrabold text-lg tracking-wider w-full flex justify-between place-items-center"
                  >
                    <div className="flex gap-5">
                      MANAGEMENT
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setMANAGEMENT(scoreCardData.MANAGEMENT.length)
                        }
                      />
                    </div>
                    <BsChevronDown className="h-5 w-6" />
                  </div>
                  <div
                    className={`${
                      dropone === 4 ? "visible" : "hidden"
                    } transition duration-300 ease-in-out`}
                  >
                    {scoreCardData.MANAGEMENT.map((card) => (
                      <div
                        key={card.id}
                        className={` flex w-3/4 border px-10 place-items-center py-2 justify-between`}
                      >
                        <div className="flex gap-10 place-items-center">
                          <div>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                setMANAGEMENT(
                                  e.target.checked
                                    ? MANAGEMENT + 1
                                    : MANAGEMENT - 1
                                )
                              }
                            />
                          </div>
                          <div>
                            <div className="font-bold text-lg">
                              {card.title}
                            </div>
                            <div className="font-semibold text-gray-500">
                              {card.subTitle}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-500">
                            MAR:{card.mar}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-gray-500 rounded-md p-2 max-h-96 overflow-auto">
                  <div
                    onClick={() => setdropone(dropone === 5 ? 0 : 5)}
                    className="cursor-pointer p-4 font-extrabold text-lg tracking-wider w-full flex justify-between place-items-center"
                  >
                    <div className="flex gap-5">
                      LEADERSHIP
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setLEADERSHIP(scoreCardData.LEADERSHIP.length)
                        }
                      />
                    </div>
                    <BsChevronDown className="h-5 w-6" />
                  </div>
                  <div
                    className={`${
                      dropone === 5 ? "visible" : "hidden"
                    } transition duration-300 ease-in-out`}
                  >
                    {scoreCardData.LEADERSHIP.map((card) => (
                      <div
                        key={card.id}
                        className={` flex w-3/4 border px-10 place-items-center py-2 justify-between`}
                      >
                        <div className="flex gap-10 place-items-center">
                          <div>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                setLEADERSHIP(
                                  e.target.checked
                                    ? LEADERSHIP + 1
                                    : LEADERSHIP - 1
                                )
                              }
                            />
                          </div>
                          <div>
                            <div className="font-bold text-lg">
                              {card.title}
                            </div>
                            <div className="font-semibold text-gray-500">
                              {card.subTitle}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-500">
                            MAR:{card.mar}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-gray-500 rounded-md p-2 max-h-96 overflow-auto">
                  <div
                    onClick={() => setdropone(dropone === 6 ? 0 : 6)}
                    className="cursor-pointer p-4 font-extrabold text-lg tracking-wider w-full flex justify-between place-items-center"
                  >
                    <div className="flex gap-5">
                      MOTIVATIONAL
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setINTELLECTUAL(scoreCardData.MOTIVATIONAL.length)
                        }
                      />
                    </div>
                    <BsChevronDown className="h-5 w-6" />
                  </div>
                  <div
                    className={`${
                      dropone === 6 ? "visible" : "hidden"
                    } transition duration-300 ease-in-out`}
                  >
                    {scoreCardData.MOTIVATIONAL.map((card) => (
                      <div
                        key={card.id}
                        className={` flex w-3/4 border px-10 place-items-center py-2 justify-between`}
                      >
                        <div className="flex gap-10 place-items-center">
                          <div>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                setMOTIVATIONAL(
                                  e.target.checked
                                    ? MOTIVATIONAL + 1
                                    : MOTIVATIONAL - 1
                                )
                              }
                            />
                          </div>
                          <div>
                            <div className="font-bold text-lg">
                              {card.title}
                            </div>
                            <div className="font-semibold text-gray-500">
                              {card.subTitle}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-500">
                            MAR:{card.mar}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-green-800 rounded-md p-4 w-2/4">
                  <div className="flex justify-between">
                    <div className="font-extrabold tracking-wider text-lg text-green-800">
                      Add Score Card
                    </div>
                    <div className="flex gap-4 place-items-center">
                      <button className="font-bold text-sm text-gray-500">
                        Reset
                      </button>
                      <button className="font-bold text-sm text-white bg-green-800 px-6 py-1 rounded-md">
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="relative w-2/4 my-4 space-y-2">
                    <div className="font-bold">Score Card Category</div>
                    <div onClick={() => setdropCategory(!dropCategory)}>
                      {cardCategory === "" ? (
                        <div className="flex justify-between p-2 place-items-center bg-gray-100 border rounded-md">
                          <div className="font-bold text-gray-400">
                            Select Category
                          </div>
                          <div>
                            <BsChevronDown />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-100 p-2 border flex justify-between place-items-center rounded-md">
                          {cardCategory}{" "}
                          <div>
                            <BsChevronDown />
                          </div>
                        </div>
                      )}
                    </div>
                    {dropCategory && (
                      <div className="absolute w-full z-10 border-2 bg-white grid grid-cols-1 divide-y">
                        <div
                          onClick={() => {
                            setcardCategory("INTELLECTUAL");
                            setdropCategory(false);
                          }}
                          className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                        >
                          INTELLECTUAL
                        </div>
                        <div
                          onClick={() => {
                            setcardCategory("PERSONAL");
                            setdropCategory(false);
                          }}
                          className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                        >
                          PERSONAL
                        </div>
                        <div
                          onClick={() => {
                            setcardCategory("INTERPERSONAL");
                            setdropCategory(false);
                          }}
                          className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                        >
                          INTERPERSONAL
                        </div>
                        <div
                          onClick={() => {
                            setcardCategory("MANAGEMENT");
                            setdropCategory(false);
                          }}
                          className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                        >
                          MANAGEMENT
                        </div>
                        <div
                          onClick={() => {
                            setcardCategory("LEADERSHIP");
                            setdropCategory(false);
                          }}
                          className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                        >
                          LEADERSHIP
                        </div>
                        <div
                          onClick={() => {
                            setcardCategory("MOTIVATIONAL");
                            setdropCategory(false);
                          }}
                          className="text-sm font-bold bg-white text-center hover:bg-gray-100 p-2"
                        >
                          MOTIVATIONAL
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="my-4">
                    <div className="font-bold">Title</div>
                    <input type="text" placeholder="Enter Title" className=" p-3 w-full rounded-md bg-gray-200" />
                  </div>
                  <div className="my-4">
                    <div className="font-bold">Hint</div>
                    <input type="text" placeholder="Enter Hint For the interviewer" className=" p-3 w-full rounded-md bg-gray-200" />
                  </div>
                  <div className="my-4">
                    <div className="font-bold">MAR(Minimum Acceptable Rating)</div>
                    <input type="number" placeholder="Give Rating From 1 to 5" className=" p-3 w-full rounded-md bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="p-4">
              <div className="px-10 text-2xl tracking-widest text-gray-800 ">
                Costumize your hiring pipeline
              </div>
              <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
              <div className="p-4 w-3/4 space-y-2">
                {pipeline.map((item) => (
                  <div
                    key={item.id}
                    className={`py-4 px-10 flex justify-between place-items-center w-full border rounded-md border-t-4 ${
                      item.id % 2 == 0
                        ? "border-t-orange-500"
                        : "border-t-blue-500"
                    }`}
                  >
                    <div className="font-bold text-lg tracking-widest">
                      {item.body}
                    </div>
                    <div>
                      <MdDelete
                        onClick={() => deletePipeline(item.id)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-2">
                <input
                  className="block p-4 text-lg border w-2/4 border-gray-500 rounded-md "
                  type="text"
                  value={newPipeline}
                  placeholder="Enter New Pipeline Header"
                  onChange={(e) => setnewPipeline(e.target.value)}
                />
                <button className="border-2 border-green-800 bg-green-100 text-sm text-green-800 rounded-md px-8 py-2 font-semibold">
                  Add New Stage
                </button>
              </form>
            </div>
          )}
        </div>
      )}
      {submit && (
        <div className="bg-white rounded-xl w-full h-[500px] grid place-items-center">
          <div className="grid place-items-center space-y-5">
            <div className="font-bold tracking-widest text-3xl text-green-800">
              Job Sucessfully Created!
            </div>
            <div className="font-semibold">
              Senior Product Designer is succesfully created. You can view it on
              Career site and dont forget to share it.
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-green-800 text-green-800 rounded-md px-8 py-2 font-semibold">
                View on Career Site
              </button>
              <button className="bg-green-800 text-sm text-white rounded-md px-8 py-2 font-semibold">
                Share and Promote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewJob;
