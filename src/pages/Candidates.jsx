import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CandidateDetailed from "../components/CandidateDetailed";
import Search from "../components/Search";
import {RotateLoader} from "react-spinners"
import axios from "../axios";

const Candidates = () => {
  const [id, setid] = useState(0);
  const [isPending, setisPending] = useState(false);
  const [apiData, setapiData] = useState([]);
  const clicked = (id) => {
    setdetailed(true);
    console.log(id);
    setid(id);
  };

  const navigate = useNavigate();

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
      name: "Stage",
      selector: (row) => row.stage,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "Applied Date",
      selector: (row) => row.appled_date,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
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
  const [selectedRows, setselectedRows] = useState([]);
  const [filteredDta, setfilteresData] = useState(apiData);
  const [detailed, setdetailed] = useState(false);

  useEffect(() => {
    const result = apiData && apiData.filter((itr) => {
      return itr.name.toLowerCase().match(search.toLowerCase());
    });
    setfilteresData(result);

    if (search.length === 0) {
      setfilteresData(apiData && apiData);
    }
  }, [search, filteredDta,isPending]);

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    setselectedRows(selectedRows);
  };

  const getMyResult = async () => {
    try {
      const res = await axios.get("/profile/");
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
    <div>
      <div className="flex justify-between place-items-center px-6 pt-3">
        <div className="text-3xl  text-gray-700 font-semibold tracking-widest">
          {apiData && apiData.length} Candidates
        </div>
        <div className="px-2 grid place-items-center">
          <button onClick={()=>{navigate("/candidates/group-email",{state:{array:selectedRows}})}} className="px-6 py-2 font-bold text-sm rounded-md text-white bg-green-800">
            Send Group Email
          </button>
        </div>
      </div>
      {!isPending ? <DataTable
        className="overflow-auto scrollbar-thin scrollbar-thumb-[#FFD700]  scrollbar-track-white"
        columns={columns}
        data={filteredDta}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        pagination
        highlightOnHover
        selectableRows
        selectableRowsHighlight
        onSelectedRowsChange={handleChange}
        customStyles={customStyles}
        subHeader
        subHeaderComponent={
          <Search change={(e) => setsearch(e.target.value)} value={search} />
        }
      />:<div className="grid place-items-center h-96 bg-white">
      <div><RotateLoader color="#FFD700" /></div>
    </div>
    }

      <CandidateDetailed func={setdetailed} id={id} detailed={detailed} />
    </div>
  );
};

export default Candidates;
