import React, { useState } from "react";
import {  AiOutlineMail } from "react-icons/ai";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { employeeData } from "../data/dummy";

const EmployeeDetailed = ({ func, detailed, id }) => {
  const [tabs, settabs] = useState(1);

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
        <div className="flex z-50 sticky top-0 inset-x-0 justify-between place-items-center p-5 bg-gray-200">
          <div className="flex place-items-center">
            <div>
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={employeeData[id - 1] && employeeData[id - 1].imgUrl}
                alt=""
              />
            </div>

            <div className="px-4">
              <div className="font-bold tracking-widest text-lg">
                {employeeData[id - 1] && employeeData[id - 1].name}
              </div>
              <div className="font-bold uppercase text-sm flex place-items-center text-gray-500">
                {employeeData[id - 1] && 
                    <div className={`
                    ${employeeData[id - 1].status==="Active" && "border border-green-600 px-2 py-1 bg-green-200 rounded-md text-xs font-bold text-green-600" }
                    ${employeeData[id - 1].status==="Inactive" && "border border-red-600 px-2 py-1 bg-red-200 bg rounded-md text-xs font-bold text-red-600" }
                    ${employeeData[id - 1].status==="Unverified" && "border border-orange-600 px-2 bg-orange-200 bg py-1 rounded-md text-xs font-bold text-orange-600" }
                    `}>
                      {employeeData[id - 1] && employeeData[id - 1].status}
                      {" "}
                    </div>
                } - 
                <div>{" "}{employeeData[id - 1] && employeeData[id - 1].team}</div>
                
              </div>
              <div className="font-bold  text-sm text-gray-500">
               Hired Date {employeeData[id - 1] && employeeData[id - 1].hiredDate}
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
                  {employeeData[id - 1] && employeeData[id - 1].name}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Email</div>
                <div className="font-bold">
                  {employeeData[id - 1] && employeeData[id - 1].email}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Origin</div>
                <div className="font-bold">Sourced</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Phone</div>
                <div className="font-bold">+91 6261630049</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Candidate Id
                </div>
                <div className="font-bold">TM3-CFP</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Website</div>
                <Link
                  to="https://yash-portflio-3010.vercel.app/"
                  className="font-bold"
                >
                  https://yash-portflio-3010.vercel.app/
                </Link>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Address</div>
                <div className="font-bold">
                  882 Coventry Court Gulfport USA Mississippi, 39501
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
                <div className="font-bold">Ux/UI Designer</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">
                  Higest Qualification Held
                </div>
                <div className="font-bold">Bachelors in Engineering</div>
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
                <div className="font-bold">3 years</div>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Linkedin</div>
                <Link
                  to="https://in.linkedin.com/in/yash-barman-20185921a?trk=public_profile_browsemap"
                  className="font-bold"
                >
                  https://in.linkedin.com/in/yash-barman-20185921a?trk=public_profile_browsemap
                </Link>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-500">Skills</div>
                <div className="flex my-2 gap-2">
                  <div className="rounded-full bg-gray-300 text-sm font-bold p-2 text-md text-gray-500">
                    UI Design
                  </div>
                  <div className="rounded-full bg-gray-300 text-sm font-bold p-2 text-md text-gray-500">
                    React
                  </div>
                  <div className="rounded-full bg-gray-300 font-bold text-sm p-2 text-md text-gray-500">
                    Tailwind CSS
                  </div>
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
