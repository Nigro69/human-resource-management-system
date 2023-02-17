import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { BsThreeDots } from 'react-icons/bs';
import CandidateDetailed from '../components/CandidateDetailed';
import Search from '../components/Search';
import { candidatesData } from "../data/dummy";

const Candidates = () => {

  const [id, setid] = useState(0);
  const clicked =(id)=>{
    setdetailed(true);
    console.log(id);
    setid(id);
  }

  const columns = [
    {
      name: "",
      selector: (row) => (
        <div>
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={row.imgUrl}
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
      selector: (row) => row.appliedData,
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
          <BsThreeDots  onClick={()=>clicked(row.id)} className="p-1 h-5 w-5 bg-gray-300 rounded-full" />
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
  const [filteredDta, setfilteresData] = useState(candidatesData);
  const [detailed, setdetailed] = useState(false);

  useEffect(() => {
    const result = candidatesData.filter((itr) => {
      return itr.name.toLowerCase().match(search.toLowerCase());
    });
    setfilteresData(result);

    if (search.length === 0) {
      setfilteresData(candidatesData);
    }
  }, [search, filteredDta]);

  return (
    <div >
      <div className='text-3xl px-6 pt-3 text-gray-700 font-semibold tracking-widest'>
        {candidatesData.length} Candidates
      </div>
      <DataTable
          className="overflow-auto scrollbar-thin scrollbar-thumb-[#FFD700]  scrollbar-track-white"
          columns={columns}
          data={filteredDta}
          fixedHeader
          fixedHeaderScrollHeight="450px"
          pagination
          highlightOnHover
          customStyles={customStyles}
          subHeader
          subHeaderComponent={
            <Search change={(e) => setsearch(e.target.value)} value={search} />
          }
        />
        
        <CandidateDetailed func={setdetailed} id={id} detailed={detailed}/>
      
    </div>
  )
}

export default Candidates
