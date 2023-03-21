import axios from "../axios";
import React, { useEffect, useState } from "react";
import {  AiOutlineMail } from "react-icons/ai";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const EmployeeDetailed = ({ func, detailed, id }) => {
  const [tabs, settabs] = useState(1);
  const [isPending, setisPending] = useState(false);
  const [apiData, setapiData] = useState({});
  const getMyResult = async () => {
    try {
      const res = await axios.get(`/employee/${id}`);
      console.log(res.data);
      setapiData(res.data);
      setisPending(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMyResult();
    setisPending(true);
  },[id]);

  useEffect(() => {
  }, [isPending])
  

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
        {isPending && <div className="grid place-items-center z-50 fixed bottom-0 left-0 right-0 top-0 bg-gray-500 bg-opacity-60">
        <div><ScaleLoader  color="#FFD700" /></div>
      </div>}
        <div className="flex z-50 sticky top-0 inset-x-0 justify-between place-items-center p-5 bg-gray-200">
          <div className="flex place-items-center">
            <div>
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={apiData && apiData.image}
                alt=""
              />
            </div>

            <div className="px-4">
              <div className="font-bold tracking-widest text-lg">
                {apiData && apiData.name}
              </div>
              <div className="font-bold uppercase text-sm flex place-items-center text-gray-500">
                {apiData && 
                    <div className={`
                    ${apiData.status==="Active" && "border border-green-600 px-2 py-1 bg-green-200 rounded-md text-xs font-bold text-green-600" }
                    ${apiData.status==="Inactive" && "border border-red-600 px-2 py-1 bg-red-200 bg rounded-md text-xs font-bold text-red-600" }
                    ${apiData.status==="Unverified" && "border border-orange-600 px-2 bg-orange-200 bg py-1 rounded-md text-xs font-bold text-orange-600" }
                    `}>
                      {apiData && apiData.status}
                      {" "}
                    </div>
                } - 
                <div>{" "}{apiData && apiData.team}</div>
                
              </div>
              <div className="font-bold  text-sm text-gray-500">
               Hired Date {apiData && apiData.hired_date}
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
        <div className="flex z-50 sticky top-[94px] bg-white inset-x-0 px-10 border-b">
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
            payroll
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
                <div className="font-bold">
                  {apiData && apiData.name}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Email</div>
                <div className="font-bold">
                  {apiData && apiData.email}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Origin</div>
                <div className="font-bold">Sourced</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Phone</div>
                <div className="font-bold">{apiData && apiData.phone}</div>
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
                  to="www.google.com"
                  className="font-bold"
                >
                  www.google.com
                </Link>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Address</div>
                <div className="font-bold">
                {apiData && apiData.address}
                </div>
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
                <div className="font-bold">{apiData && apiData.highest_qualification}</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Expected Salary
                </div>
                <div className="font-bold">-</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Current Salary
                </div>
                <div className="font-bold">-</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Experience in years
                </div>
                <div className="font-bold">{apiData && apiData.experince} years</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Linkedin</div>
                <Link
                  to="www.google.com"
                  className="font-bold"
                >
                  www.google.com
                </Link>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Skills</div>
                <div className="flex my-2 gap-2">
                {apiData.skills && apiData.skills.map(skill=>(
                  <div key={skill.id} className="rounded-full bg-gray-300 text-sm font-bold p-2 text-md text-gray-500">
                  {skill}
                </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button
          className="bg-gray-300 py-2 fixed top-2/4 left-0 my-auto"
          onClick={() => func(false)}
        >
          <HiOutlineChevronRight className="h-5 w-5 " />
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetailed;
