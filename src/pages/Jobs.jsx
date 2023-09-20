import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import axios from "../axios";
import { RotateLoader } from "react-spinners";
import {jobsMainData} from "../data/dummy";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setjobs] = useState(0);
  const [apiData, setapiData] = useState(jobsMainData && jobsMainData);
  const [isPending, setisPending] = useState(false);
  const [josDataArray, setjosDataArray] = useState(jobsMainData && jobsMainData);
  const [sortlist, setsortlist] = useState(0);
  const [status, setstatus] = useState(0);

  // const getMyResult = async () => {
  //   try {
  //     const res = await axios.get("/jobs/");
  //     console.log(res.data);
  //     setapiData(res.data);
  //     setisPending(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getMyResult();
  //   setisPending(true);
  // }, []);

  useEffect(() => {
    switch (sortlist) {
      case 0:
        {
          let cpyArray = [...apiData];
          cpyArray.sort((a, b) => b.publishData - a.publishData);
          setjosDataArray(cpyArray);
        }
        break;
      case 1:
        {
          let cpyArray = [...apiData];
          cpyArray.sort((a, b) => a.publishData - b.publishData);
          setjosDataArray(cpyArray);
        }
        break;
      case 2:
        {
          let cpyArray = [...apiData];
          cpyArray.sort((a, b) => a.publishData - b.publishData);
          setjosDataArray(cpyArray);
        }
        break;
      default:
        break;
    }
  }, [sortlist]);

  useEffect(() => {
    switch (status) {
      case 0:
        setjosDataArray(apiData && apiData);
        break;
      case 1:
        {
          let cpyArray =
            apiData && apiData.filter((job) => job.status === "Published");
          setjosDataArray([...cpyArray]);
        }
        break;
      case 2:
        {
          let cpyArray =
            apiData && apiData.filter((job) => job.status === "Draft");
          setjosDataArray([...cpyArray]);
        }
        break;

      default:
        break;
    }
  }, [status, isPending]);

  return (
    <div className="bg-gray-200 py-2">
      <div className="flex border-b border-b-gray-300">
        <button
          className={`uppercase text-md px-4 py-2 font-bold ${
            jobs === 1 && "border-b-2 border-b-[#FFD700]"
          } ml-4`}
          onClick={() => setjobs(1)}
        >
          active jobs
        </button>
        <button
          className={`uppercase px-4 py-2 text-md font-bold ${
            jobs === 2 && "border-b-2 border-b-[#FFD700]"
          }`}
          onClick={() => setjobs(2)}
        >
          inactive jobs
        </button>
      </div>
      <div className="py-4 px-6">
        <div className="flex justify-between place-items-center">
          <div className="flex space-x-20 place-items-center">
            <div className="uppercase tracking-widest text-xl text-gray-700 font font-semibold">
              {josDataArray.length} active jobs
            </div>
            <div>
              <Dropdown
                name={"Sort By:"}
                list={["Most Candidates", "Minimum Candidates", "Publish Date"]}
                set={setsortlist}
              />
            </div>
            <div>
              <Dropdown
                name={"Status:"}
                list={["All Status", "Published", "Draft"]}
                set={setstatus}
              />
            </div>
          </div>
          <div className="grid place-items-center">
            <button
              onClick={() => navigate("/new-job")}
              className="grid place-items-center bg-green-800 shadow-md px-6 py-2 text-white rounded-md text-sm"
            >
              Create New Job
            </button>
          </div>
        </div>
        {!isPending ? (
          <div className="px-4 pt-6 grid grid-cols-4 gap-y-6 place-items-center">
            {apiData && josDataArray.map((job) => (
              <div
                key={job.id}
                className={`h-80 w-60 p-2 bg-white rounded-md shadow-md border-t-4 ${
                  job.status === "Published"
                    ? "border-t-green-300"
                    : "border-t-gray-500"
                }`}
              >
                <div className="uppercase font-bold text-md text-gray-400 px-2 py-1">
                  {job.category}
                </div>
                <div className="font-bold px-2 py-1">{job.title}</div>
                <div className="font-bold text-md text-gray-500 mt-4 px-2 py-1">
                  Candidates:
                </div>
                <div className=" bg-gray-200 rounded-md p-4 grid grid-cols-2">
                  <div className="border-l-4 border-l-gray-400">
                    <div className="uppercase text-md font-bold text-gray-500 px-2 py-1">
                      total
                    </div>
                    <div className="text-xl font-bold px-2">
                      {job.candidates.total}
                    </div>
                  </div>
                  <div className="border-l-4 border-l-gray-400">
                    <div className="uppercase text-md font-bold text-gray-500 px-2 py-1">
                      New
                    </div>
                    <div className="text-xl font-bold px-2">
                      {job.candidates.new}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-4 px-2">
                  <div className="text-md font-bold text-gray-400">
                    {job.location}
                  </div>
                  <div className="text-md font-bold text-gray-400">-</div>
                  <div className="text-md font-bold text-gray-400">
                    {job.type}
                  </div>
                </div>
                <div className="flex justify-between px-2 mt-8 py-1 border-t">
                  <div className="text-md font-bold text-gray-500">
                    {job.status}
                  </div>
                  <div
                    onClick={() =>
                      navigate("/job-detailed", { state: { job } })
                    }
                    className="cursor-pointer text-md font-bold text-gray-500"
                  >
                    see details {">"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid place-items-center h-96">
            <div>
              <RotateLoader color="#FFD700" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
