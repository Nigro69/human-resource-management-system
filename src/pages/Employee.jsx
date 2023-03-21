import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import Search from "../components/Search";
import axios from "../axios";
import EmployeeDetailed from "../components/EmployeeDetailed";
import { useNavigate } from "react-router-dom";
import {RotateLoader} from "react-spinners"

const Employee = () => {
  const navigate=useNavigate();

  const [apiData, setapiData] = useState([]);
  const [isPending, setisPending] = useState(false);

  

  const [id, setid] = useState(0);
  const clicked = (id) => {
    setdetailed(true);
    setid(id);
  };

  const columns = [
    {
      name: "",
      selector: (row) => (
        <div>
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={row.image}
            alt=""
          />
        </div>
      ),
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "Team",
      selector: (row) => row.team,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "Hired Date",
      selector: (row) => row.hired_date,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <div
          className={`
        ${
          row.status === "Active" &&
          "border border-green-600 px-3 py-1 bg-green-200 rounded-md text-sm font-bold text-green-600"
        }
        ${
          row.status === "Inactive" &&
          "border border-red-600 px-3 py-1 bg-red-200 bg rounded-md text-sm font-bold text-red-600"
        }
        ${
          row.status === "Unverified" &&
          "border border-orange-600 px-3 bg-orange-200 bg py-1 rounded-md text-sm font-bold text-orange-600"
        }
        `}
        >
          {row.status}
        </div>
      ),
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "",
      cell: (row) => (
        <button>
          <BsThreeDots
            onClick={() => clicked(row.id)}
            className="p-1 h-5 w-5 bg-gray-300 rounded-full"
          />
        </button>
      ),
      center: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "6px", // override the cell padding for head cells
        paddingRight: "6px",
        // backgroundColor: '#C5C5C5',
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "6px", // override the cell padding for data cells
        paddingRight: "6px",
      },
    },
  };

  const [search, setsearch] = useState("");
  const [filteredDta, setfilteresData] = useState(apiData);
  const [detailed, setdetailed] = useState(false);
  const [selectedRows, setselectedRows] = useState([]);
  const [seletOptions, setseletOptions] = useState(false);
  const [filterOptions, setfilterOptions] = useState(false);
  const [status, setstatus] = useState(0);

  useEffect(() => {
    switch (status) {
      case 1:
        {
          let cpyArray = apiData && apiData.filter(
            (job) => job.status === "Active"
          );
          setfilteresData([...cpyArray]);
        }
        break;
      case 2:
        {
          let cpyArray = apiData && apiData.filter(
            (job) => job.status === "Inactive"
          );
          setfilteresData([...cpyArray]);
        }
        break;
      case 3:
        {
          let cpyArray = apiData && apiData.filter(
            (job) => job.status === "Unverified"
          );
          setfilteresData([...cpyArray]);
        }
        break;
      case 4:
        setfilteresData(apiData && apiData);
        break;

      default:
        break;
    }
  }, [status]);

  const groupDelete = () => {};

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    setselectedRows(selectedRows);
    console.log(selectedRows);
  };

  useEffect(() => {
    const result = apiData && apiData.filter((itr) => {
      return itr.name.toLowerCase().match(search.toLowerCase());
    });
    setfilteresData(result);

    if (search.length === 0 && !seletOptions) {
      setfilteresData(apiData && apiData);
    }
  }, [search,isPending]);

  const getMyResult = async () => {
    try {
      const res = await axios.get("/employees/");
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
  },[]);

  return (
    <div className="bg-gray-200">
      <div className="flex justify-between px-6 py-1 place-items-center z-10">
        <div className="flex gap-10">
          <div className="text-3xl  text-gray-700 font-semibold tracking-widest">
            {apiData && apiData.length} Employees
          </div>
          <div className="relative grid place-items-center">
            <div className="grid place-items-center">
              <button
                onClick={() => setfilterOptions(!filterOptions)}
                className="flex bg-white px-4 py-1 rounded-md text-gray-500 font-semibold gap-2 text-sm place-items-center"
              >
                <BiFilterAlt /> Filter
              </button>
            </div>
            {filterOptions && (
              <div className="absolute top-9 z-10 grid grid-cols-1 divide-y bg-white rounded-lg shadow-lg">
                <div onClick={()=>{setstatus(1); setfilterOptions(false)}} className="text-gray-500 p-2 text-sm font-semibold cursor-pointer hover:bg-gray-100">
                  Active
                </div>
                <div onClick={()=>{setstatus(2); setfilterOptions(false)}} className="text-gray-500 p-2 text-sm font-semibold cursor-pointer hover:bg-gray-100">
                  Inactive
                </div>
                <div onClick={()=>{setstatus(3); setfilterOptions(false)}} className="text-gray-500 p-2 text-sm font-semibold cursor-pointer hover:bg-gray-100">
                  Unverified
                </div>
                <div onClick={()=>{setstatus(4); setfilterOptions(false)}} className="text-gray-500 p-2 text-sm font-semibold cursor-pointer hover:bg-gray-100">
                  All
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex place-items-center gap-4">
          <div className="font-bold text-xl">{selectedRows.length} </div>
          <div className="font-bold text-gray-500">Selected</div>
          <div className="rounded-lg relative p-1 bg-gray-300 cursor-pointer">
            <BsThreeDotsVertical
              onClick={() => setseletOptions(!seletOptions)}
              className="h-6 w-6"
            />
          </div>
          {seletOptions && (
            <div className="absolute z-20 right-20 top-[98px] bg-white rounded-md shadow-xl grid grid-cols-1 divide-y">
              <div onClick={()=>{navigate("/employee/group-email",{state:{array:selectedRows}}); setseletOptions(false);}} className="font-semibold cursor-pointer text-sm p-2">
                Send Email
              </div>
              <div
                onClick={groupDelete}
                className="font-semibold cursor-pointer text-sm p-2"
              >
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
      {!isPending ? <DataTable
        className="overflow-auto scrollbar-thin scrollbar-thumb-[#FFD700]  scrollbar-track-white"
        columns={columns}
        data={filteredDta}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRows
        selectableRowsHighlight
        onSelectedRowsChange={handleChange}
        pagination
        highlightOnHover
        customStyles={customStyles}
        subHeader
        subHeaderComponent={
          <Search change={(e) => setsearch(e.target.value)} value={search} />
        }
      />:
      <div className="grid place-items-center h-96 bg-white">
        <div><RotateLoader color="#FFD700" /></div>
      </div>
      }

      <EmployeeDetailed func={setdetailed} id={id} detailed={detailed} />
    </div>
  );
};

export default Employee;
