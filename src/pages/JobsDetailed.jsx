import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsChevronDown, BsThreeDots } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { candidatesData, scoreCardData } from "../data/dummy";
import Search from "../components/Search";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import Myfb from "../components/formbuilder/Myfb";
import { MdDelete } from "react-icons/md";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import axios from "../axios";
import {ClockLoader} from "react-spinners"
import { auth } from "../firebase/config";

const JobsDetailed = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const onChange = (e) => {
    const files = e.target.files;
    files.length > 0 && seturl(URL.createObjectURL(files[0]));
  };

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const [dropone, setdropone] = useState(0);
  const [isPending, setisPending] = useState(true);
  const [INTELLECTUAL, setINTELLECTUAL] = useState(0);
  const [PERSONAL, setPERSONAL] = useState(0);
  const [INTERPERSONAL, setINTERPERSONAL] = useState(0);
  const [MANAGEMENT, setMANAGEMENT] = useState(0);
  const [LEADERSHIP, setLEADERSHIP] = useState(0);
  const [MOTIVATIONAL, setMOTIVATIONAL] = useState(0);
  const [cardCategory, setcardCategory] = useState("");
  const [dropCategory, setdropCategory] = useState(false);
  const [newPipeline, setnewPipeline] = useState("");
  const [pipeline, setpipeline] = useState(null);
  const [title, settitle] = useState("");

  const [tabs, settabs] = useState(1);
  const [url, seturl] = useState("");
  const [content, setcontent] = useState(
    "<div>We are looking for a UI/UX designer with a special place in his heart for designing and the ability to work in a fast-paced entrepreneurial environment. It would help if you got excited about creating beautiful-looking consumer products (Apps/ Websites/Graphics) that are simple, intuitive, and responsive.</div><div><br></div><div><b>Responsibilities</b></div><div><br></div><div>Execute all visual design stages from concept to final handover to the technology team • Collaborate with product managers and tech team throughout the design life-cycle such as product wireframes, user</div><div>flows, information architecture, mockups, and visual design,.. o Design new products, user interfaces, and user experiences from scratch across multiple platforms-mobile, desktop, and applications Simplify complex user flows and interactions which are scalable as the products evolve</div><div><br></div><div>Should be good at Iconography, creating Product Assets, and Graphics Ability to execute Social Media Creatives Notifications, Emailers, etc.</div><div>Create a design theme that promotes a strong brand affiliation and brand recall within the target group Hands-on experience with creating short videos and editing.</div><div><br></div><div><b>Requirements</b></div><div><br></div><div>3-years of experience in Graphics, frustration &amp; UI/UX design Formal education in UX/UI Design, Interaction Design Motion, Graphic Design, or a related field of study is a plus</div><div><br></div><div>Good aesthetic sense especially in the domains of typography and color theory</div><div><br></div><div>Strong online portfolio showcasing your best work. You must have proven Adobe Suite Photoshop illustrator, Aherficts, XD Sketch Avalon, Marvel, Jr, Expense creatively saving hand problems shipping innovative Self-motivated without lovers of people in between Excellent communica be conformations aesenting work product managers products within deadlines</div><div>stakeholders.<br></div>"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setisPending(true);
    addNote();
    setnewPipeline("");
    settitle("");
  };

  const deletePipeline = async (id) => {
    setisPending(true);
    try {
      const res = await axios.delete(`/note/${id}`
      );
      console.log(res.data);
      getMyResult();
    } catch (error) {
      console.log(error.message);
    }
  };
console.log(location.state.job.id)
  const addNote = async () => {
    try {
      const res = await axios.post("/notes/",
        {
          "title": title,
          "text": newPipeline,
          "job": location.state.job.id,
          "profile_id": `${auth.currentUser.uid}`,
          "time_stamp":Date.now(),
          "user":1
      }
      );
      console.log(res.data);
      getMyResult();
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <BsThreeDots className="p-1 h-5 w-5 bg-gray-300 rounded-full" />
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

  useEffect(() => {
    const result = candidatesData.filter((itr) => {
      return itr.name.toLowerCase().match(search.toLowerCase());
    });
    setfilteresData(result);

    if (search.length === 0) {
      setfilteresData(candidatesData);
    }
  }, [search, filteredDta,isPending,pipeline]);

  const getMyResult = async () => {
    try {
      const res = await axios.get("/notes/");
      setpipeline(res.data);
      console.log(res.data)
      setisPending(false);
      console.log(!isPending && pipeline);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMyResult();
    setisPending(true);
  },[]);

  return (
    <div className="bg-gray-200 py-4 px-6 ">
      <div className="flex justify-between">
        <div className="flex">
          <div className="grid place-items-center mr-6">
            <IoIosArrowBack
              onClick={() => navigate("/jobs")}
              className="p-2 cursor-pointer h-8 w-8 rounded-full bg-gray-100 hover:bg-white"
            />
          </div>
          <div className=" space-y-1">
            <div className="uppercase text-md font-bold text-gray-400">
              {location.state.job.category}
            </div>
            <div className="font-semibold text-xl tracking-widest">
              {location.state.job.title}
            </div>
            <div className="flex text-md font-semibold text-gray-400 justify-between">
              <div>{location.state.job.location}</div>
              <div>-</div>
              <div>{location.state.job.type}</div>
            </div>
          </div>
        </div>
        <div className="flex place-items-center gap-4">
          <button className="px-2 py-1 text-md font-bold text-green-800 border-2 border-green-800 rounded-md">
            Share & Promote
          </button>
          <button className="px-4 place-items-center py-1 flex gap-3 text-md font-bold border-2 border-green-800 text-white bg-green-800 rounded-md">
            Published <BsChevronDown />
          </button>
        </div>
      </div>
      <div className="flex border-b border-b-gray-300 text-gray-400 my-4">
        <button
          className={`uppercase text-md px-4 py-2 font-bold ${
            tabs === 1 && "border-b-2 border-b-[#FFD700] text-gray-800"
          } ml-4`}
          onClick={() => settabs(1)}
        >
          Cantidates
        </button>
        <button
          className={`uppercase px-4 py-2 text-md font-bold ${
            tabs === 2 && "border-b-2 border-b-[#FFD700] text-gray-800"
          }`}
          onClick={() => settabs(2)}
        >
          job details
        </button>
        <button
          className={`uppercase px-4 py-2 text-md font-bold ${
            tabs === 3 && "border-b-2 border-b-[#FFD700] text-gray-800"
          }`}
          onClick={() => settabs(3)}
        >
          timeline and notes
        </button>
        <button
          className={`uppercase px-4 py-2 text-md font-bold ${
            tabs === 4 && "border-b-2 border-b-[#FFD700] text-gray-800"
          }`}
          onClick={() => settabs(4)}
        >
          Application Form
        </button>
        <button
          className={`uppercase px-4 py-2 text-md font-bold ${
            tabs === 5 && "border-b-2 border-b-[#FFD700] text-gray-800"
          }`}
          onClick={() => settabs(5)}
        >
          Settings
        </button>
      </div>
      <div className={tabs === 1 ? "bg-white rounded-md p-1" : "hidden"}>
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
      </div>
      <div className={tabs === 3 ? "flex gap-3" : "hidden"}>
        <div className="w-2/4 bg-white rounded-md p-4 h-screen overflow-auto">
          <div className="font-bold text-lg tracking-wide">Timeline</div>
          <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
          <div>
            <ol className="relative border-l border-gray-200">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                  <div className="">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBERERURERIREREPEREREBEPERESERERGBQZGRgUGBgcIS4lHR4rIRgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QGhISGjQhISExNDQ0MTY1NjQxNDQ0NDQ0MTExNDE0NDE2MTE0MTQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQxMf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAACAwAEAQUHBgj/xAA+EAACAQIEAwYDBQcCBwEAAAABAgADEQQSITEFQVEGEyJhcYEHMpEjUoKhsRRyksHR4fBCwiQzQ1Nic6IV/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAfEQEBAAICAwEBAQAAAAAAAAAAAQIRAzESIUEyQlH/2gAMAwEAAhEDEQA/ALdOWEERTllJ1YMQR6iLQR6iQEojVEFYxRAJRDUSKIxRAyojAJhRCAkEAhASAQwIaYAhATIWEFgQCTLCAmTAC0loOJxCUkapUZadNFLO7myqo3JM8BjPiMXcphKWZB/1KpALa7qhI09YHQrSWnN27c4qnqy020vZlH+0zYYD4iUWOWvTZOroc4Hnl3t9YHuLSWi8HiqdZBUpOtRGGjKbj08j5R9oCyJCIy0wRAXaYIhkTBEBZExaMIgEQAIgkRhEAiABEEiGRBMMlMIpo5oppQgpMw5IGgpiWUERTEs0xKHII9YpRHKJAaCOUQEEaogEojVEFRGKJGmQIQEgEMCBAIYEgEICBAIQEyBCAgYtIRCtNb2jxbUcJXqJ860ytP8A9jkIn5sIHI+13F8RxHGPh6RqNQpuyU6KfIxQ2NRxsTfmdtLSzgezWLRNcq3GgCn87bz1HZfg6UF2GdgAxO9hsL+5PqZ7GhRUDaeXPly8tR68OHHxly+uP4/gWJVQ4TOCbEpZl/sZSPZquVz2Kkbb6eRE7RiMEj62seZXQn1muxFAWtb8t5m82TePDja5LwPjeL4XWLKC1IsBWpH5XUcx0bofrpO48NxtPE0Ur0jmp1UDodjY8iORGxHlOX8ewozmw01uLTdfC/iwyvgGAHdF6tG3/bLAup9GcEevlO3Hn5R5+bi8b6e/ktCtMTs4hIgkRkEiAsiYIhkQSIAGARGkQCICyIJEMiC0BTxLRzxTQyVeSCZJRpactLK1OWklDlj0iVj0EgcojUEBYxRDQ1hrMKIYEgIRgEFRDUQMgQwJgCGBAgEICQCZAgZtND2ycDCFTez1aSkDdgGz5ffJN/aeY7aYgd3lS7PScO4VScgZSFY2k3pZLelLgeIDL3j6ZycijmBoT7mbaj2jwiP3b1UVr2sTsehnnMM48CZKhSlRR2TKVFRibKB95RZiR+75g63iuCbE1gDSVaWS6vnHiey2TKNiLsDpyGpvPL63bXu1bjJHTQ6N4kYFT0M1+OamgJZgL6m/Seb7MpWoO+GAFT7FaqCrUZBTGYqVuFY20Fh59J5Lj+KrYzFNQJ7rIwpt4mdFINixNhp7RqVndxbDjmJpnMadRWNyLAi81HYSs1PidHlnNSm3mrI1v/oD6TTYjCikljTZGD5QzNfPpcm1ttZZ7PYoUMfhqjuERHps7toFQk+I+zH6GdMMZj05cuVynt3y0wRBw9ZKiK9Ng6OodHU3VlIuCIydnnLkIhGYMoAwTDIgmABEAiGYJgAYto0xTQFPFPGtFPDJMxMzEo01KWklWnLSSixTllJXpywkgcsagi0jVkaGohqIKxggGIawVENRAICGBMCGIGAIQkAhCQS01HEaIbvQAC7oFF/NdSfYTcCUuIYcmzrckaOBe5XkdOl5jkm56deLKTL39aKlh2cU61MAvTQoyXAFSm1iVB2DAqCCdNxpe42OHxSEG9OqjAeJWoupv0z2yn1DW85R4XV7sd3Y+Aldd7DabKtxOjTW9RlG84Y35Xpu+4Tw+kWqPWK5TUVURfu0kJsPUlmP06TneNVaXFKua7U6puWUZijka6DcaT0nEqhZ2rU/2hntlpgVXRUBIBIRdGPivcgzn1ValDFMKjvfvc5qPdiwHLyvrKbkeo4hQw2RnzUb5dWXKWt6DW/+aTwPGKyM91GUZfCDuAFCi/nZZ6jtJxCm6L3bXFuW20p9jOzv/wCjiwXB/Z8OFesbaMP9NK/Vuflfylx9xnks37dg7N0cmCwybZMLhwQdwe7W82UK0wRPQ8lYMEwpgyoAwTDMAwAMEwzAMADFNGtFNASYpoxolzAXeSCWmZWWmSWqZlNDLVOUXKcsrKtOWUkD0jliUjkkaMWMEBYxYBKI0QFhiAYhCYEyJAYmZgTIgZEzIJmB5PjVPuqzOdEcZwR1O/5gzTYnBtiSHBcBANENi7Xva9tLT0HaymxemRs6Oh+6SLEA/Ukek8pwviz0HenWQqL3VuW/5C36Tz5Yy5XT1Y5WYy1MWq00OfA4ip4rNVDuxIHXXNPIY3DivUApUqtBHI0ctlUfum5nuMd2hp6Xq01ufDZxa17XnnOMccp00OVkdztaza6b2MsxrWXLLjrbQPg2fEJhKQLvdaYAN8zsb3vyGvtO88G4cuFw9LDptSRUJAtma3ib3NzOTfCSi1biD1n8Zp0HdnPJ3ZVUD1Bf6Ts864x5srWIJhGCZpgJkMhmDKBMEwmgGABgtMtAYwBYxTmGxinMBTxLxjGKeGVcvMQ8oklGkQy5TlJN5dpyi3TlpJUpyykgsJHLErGrI0esYsSsapgNWGIsQ1gMEIQRMgwDEISjj+KYfDLmr1qdIcg7gMfRdz7TyPFPiZhadxhqb4huTP8AZU/zBY/SJLTb3wmn4z2nweDH29ZQ/Kml6lQ/hXb1NhORcY7Z8Qxdw1XukP8A08PemtvNr5j7m084409d/XrNTH/U27x2b4gOKUa9VgVpnEZKCkDNTVEQgm27EsxPkbcpruMcMGYpUWzW0I5jqD0ifg5Uvhayfdrhv4qaj/YZ6rj1fDkZKl3dDoKZGdCRe5PIW5c+m04cuG767duLk8fV6ch49wPJ40qNroL2bXpNJQ7K4rEElQci/PUc2RB5nmfIazrC4LBVaoFTEeFNSjJ3Zve2VmJ036e83HFVoYag1RwqUsOjNlUWAA5AdSdOpJkwxy/pvkzx/lxanxVuDYqgaADugqGurXUVUcBcrW2HhuOhUGdW7M9uMFxABUfua+xw9dlVyf8AwN7OPTXqBODcWxLYiu9Vt6jFrclHJR6DSV+729Z38Xnt2+pzMEzh3APiFjsIoSoRiqSiwWuzCoo6LUFz/EGnReC9vuH4oANU/Zqmxp4khBf/AMX+U/UHykuNNvUkzBMwrggEEEEXBBBBHUGYJgYJgEzJMAmBhjFsYTGLYwBYxTGGxinMAGMS5hOYpmlZDeSDeSBpKcuUzKSS3TlF2mZZQypTMsoZBaUxqmIUximGlhYxTFKYamQPUwxFKYwGAwGct7d9qsWuKq4WjUejSo5Ebu/BUdyoYtnHiA8QFgRtzvPVduePvgcMrUSgrVagRM4zWUAlmA200Gums47Xqu7O9Rmeo5LO7m7M3Umaxn1KxUdmJZmLMd2YlmJ8yd4B0hKJiqNJ0RlfXXpzhZbyLTuNdfKMAge7+FeMdatfDISrYhKZDgAimKYe7W6nMAP7T1vFuDJhFWrTLMjsVrmoQ7Fnuc5LddQb6XIPWeG+F9TLxNV+/Qqr9Mp/lOkdq8WoprRvq7gsAC3gTckAg7kfTynLL9NTpzviOJrNWGGwyl6jm4scxsy6EeIhtBu2ljE9t8RXwuGo8NqVmquQK1cE5u7U6U6OfdgLFtfLlaen7DPSFXHYqpvQFMZ2NyiKhLannYDmdt5zDjfEWxeKq4h96zlrH/Suyr7KAPaXH3UrTkazLC38Q/WHUXWAijMNN9us0g3WAVjjBKf5rA2HBO0OLwZ/4eqyLe5pv46J9UOg9RY+c6X2Y+IdDFuuHrL3OIc5VYa0aj8lDHVSeh9LzjtdiosASZWV3Uh1YBkIYZd1Km4P1EzVj6fJgMZEe6g9QD9RBYzKhYxZMImAxlAsYlzDYxbGAlzEsYxzK7mGWM0kTnkga1JbpmUqZlqmZRcpmWUMpoZZQyC2hjlMrIY5TDSwpjFMQpjFMB6mNUyupg43FLRpPVb5aSO7X6KpP8pByb4gcR/aMe6A3p4YCgg5Zt3b1zG34BPNZ7XU8xoZDUZ2Z31d2Z2PVmNz+ZMxX89uvSdZ6jIkOvrYwn1+sWh+U+3lpGqd5QVOGII0hCBv+wlXJxTCm/zVGQ/iRh+tp7LH4xqj1He5R3+ztYhRnIQ3Oh+a+u15zfhWM/Z8TRr8qNZHNul7H8jPeomTDghFcZRo2qZrWzk3N1LNrpfaYy7WNBiOIdxgcVTU/aYzFJSa1791TUu+5JIJdV8w08io/OWOIODUbLa2b/T8pNgCwHna8Uo0lxnoqtV01Ow5xNBLkueeig8h19YzEeJrcgdfM9IRIUEnlCI29pKmn6wcPrdjAevvYZmJyqPIbn6ky7CKqjdjp0vp/eJzG3hGRep3PpLHc63Y5m89h6CLqzNHeOw+NFbhuGcXutIUmuSTnp+Am565b+83ZM8H8I65bBVUJ/5eJa3kHRT+t57kmZaRjFMYTGKYwMMYpzCZol2hkDmIcw3MQ7QFlJJi8zA1dMy1TMo0zLdMyi6hlhDKaGPRpBcRo5GlRGj0aGlpTGKZXVo1WgWFM0Hb1yOG17PkuKanS+YNVQFfe9vebpWnkPibWcYREX/l1KyiobX+VSyKfcX/AAiJ2y5iNRv7cv7RbVG2+YdDo315ywlj/XaLrUTf5vTQX/p+U6jGHNxoLWbYixjlbWVaQIYgkm/p/KOJ/wA0gPuYStFK3+aTKGBnEfKfS897xXHlaCOWI+zputggLEBXUDyvlFwSNee88C50m14jxLPg8Oo2FMI17XLU7oxJB1vZNxM0ahTc9YbvbQbnbnYdfb+kTTawvBVr69dttoEuAedhtz/WV8RUzELsAQT56xlRjKiG7HeK0ud7lQn1iMNoLgZifmZjZeth5QMQb5UW55tvtHgNawQ6feIH95Pohcb3Fh9PrKdapfbbrH1lA3Fz9RKlU+RktSOofB2p9nil5h6LW9Qw/lOjsZzr4S8OKUauJz+GuwpCnb/t65i34yLWnv2aZissYtmkZolmlZZZop2kZop2gC7SuzTNRpXd5QWaSJzyQKFMy1TMpU2lpGgXEaOUyqjR6mBZRo9WlRDHoZBZRo1WlZTGq0NLKtPE/E/GWo0KAJu9VqrAfdRSov7uP4Z7JTOYfEHF95je7B0w9JE/E3jP5MsuPbLzyrcXGkw4PX9f6yU20t/WYqNp/nlOgqO9mB840vzlPFP+ois8ztdNmlUcjGk/0mmD5dRNhQrZliXZo930lam5yAHmWIHQEwK1XQ9eUgYD0UWhDmN/CPxekyze0RTfS/M6+3KSo+kDFZ7/AOf2iaRtrFs9zMZr+EczaZ20u4VP9XNtdeQ5CPdwBBpjT02mHTnp6kzTJDnmZXcBvve0dVf3PQCV6jseVhMVp1/4ZmoOHgOmVO9c0W2LoTqSP3swv5T1bNNN2TTLw/DC1vsEb+IZr/nNqzRGUZostMM0W7yjLPEO8wzxDPAlR5Wd4TvK7tAz3kkrZ5ICabSyjSlTaWUaBdRo9WlFHlhHgXEaORpURo5WgXEaNVpTRo9GkFhWnGOLYk1cTWqnXPVqEb/LmIUfQCdjRpw7GYgCrUGpvUqEZRcgFjNYhyv7GLqPpEqXb5WK/vLAqMyjxkG/3b3/AEl2MU8O1aoqLqztYdAOZ9ALme1w3YWlUQWZ05d43iZj0C7e00/YmgGrO7a5Qqr+I3P6D6zsHZ7AGoSbKVByBWF/Dvm1/wA0nmy3llqXWnpnjjhuzdri3FezDUiRSqd+Ba1qZRjc2tYnz9zp0vqsndkqxAOxFwbH1E77294dQSihAValWolNLAKzFr3Jtv8A3lzFYbC4PAVcRXo03Ap5mR6aHPyp0tRbUkD1bynSXV1252bm+nzgHu3veSvU0tzO/pNhiKId2fKiFmZitNQiLmN8qryUbCVHwpve95uy6YBSFoFapDseQvLNLgOLezLRezAFSbAEHY6mTKyRcZb1GsvLGCpktfkJ7XgfYpdGxDXa/wAgPhHqef6TS9oK1NcRURLLTpN3SKumiaHQdTmPvOeOUyvr43lx3HHd+q6+35TDiADYb6cucRVq3+8fTSdrXMupVJNkF+p5RPdMxC3zMxACjcsdAJlqjDZbCbTshhDXx9BSCQj943kE8X6gD3mLR2nDJ3dNKf3ERNNvCoH8plngs8U7zTI3eJd4DvEu8AneJd4LvEu8CO8Q7yO8rVHgTPJK95JAVJo9WkklDkaPRpJID0aPR5JIDleMV5JIDcxtpvbT1nEaFQkDnexJ5k9ZJJYCatocuw3Y+W9hFoBpbdhe7am0zJAv8KxVTDFitjnA35W5+us23Du3GPwlW61cyZSClSzaC5Cg5dLcv12tJJmybb3em/4NxurxjiNJ6xJpUWC0l8IuxtmcgWte17enSek+MeNK0MPQBP2tR6h81RbAH3e/tJJOeH6ref5jkbETFtZJJ2cyEpglj0OUeQ0/rLtHHYikPBWqKBZSubMoA0Fg17ctpiSSyXsls6bBO0+LWwvSaw+ZkOZtOdiB9AJocSneVKjkANUZ6nUAlr2F/WSSJhjOi55ZdgR9CrbqbXHWZbQ7/WSSBUr1Ok9r8MsN4q9cjUBKS+/ib9FkkmZ2Xp713iHeSSaZDminaSSAh2inaYkhCGaIqNJJCkZpJJIR/9k="
                      alt=""
                    />
                  </div>
                </span>
                <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                  <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                    just now
                  </time>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                    Bonnie moved{" "}
                    <a
                      href="#"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Jese Leos
                    </a>{" "}
                    to{" "}
                    <span className="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded">
                      Funny Group
                    </span>
                  </div>
                </div>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white ">
                  <div className="">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="data:image/jpeg;base64,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"
                      alt=""
                    />
                  </div>
                </span>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm ">
                  <div className="items-center justify-between mb-3 sm:flex">
                    <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                      2 hours ago
                    </time>
                    <div className="text-sm font-normal text-gray-500 lex ">
                      Thomas Lean commented on{" "}
                      <a
                        href="#"
                        className="font-semibold text-gray-900  hover:underline"
                      >
                        Flowbite Pro
                      </a>
                    </div>
                  </div>
                  <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50">
                    Hi ya'll! I wanted to share a webinar zeroheight is having
                    regarding how to best measure your design system! This is
                    the second session of our new webinar series on
                    #DesignSystems discussions where we'll be speaking about
                    Measurement.
                  </div>
                </div>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white ">
                  <div className="">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBERERURERIREREPEREREBEPERESERERGBQZGRgUGBgcIS4lHR4rIRgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QGhISGjQhISExNDQ0MTY1NjQxNDQ0NDQ0MTExNDE0NDE2MTE0MTQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQxMf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAACAwAEAQUHBgj/xAA+EAACAQIEAwYDBQcCBwEAAAABAgADEQQSITEFQVEGEyJhcYEHMpEjUoKhsRRyksHR4fBCwiQzQ1Nic6IV/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAfEQEBAAICAwEBAQAAAAAAAAAAAQIRAzESIUEyQlH/2gAMAwEAAhEDEQA/ALdOWEERTllJ1YMQR6iLQR6iQEojVEFYxRAJRDUSKIxRAyojAJhRCAkEAhASAQwIaYAhATIWEFgQCTLCAmTAC0loOJxCUkapUZadNFLO7myqo3JM8BjPiMXcphKWZB/1KpALa7qhI09YHQrSWnN27c4qnqy020vZlH+0zYYD4iUWOWvTZOroc4Hnl3t9YHuLSWi8HiqdZBUpOtRGGjKbj08j5R9oCyJCIy0wRAXaYIhkTBEBZExaMIgEQAIgkRhEAiABEEiGRBMMlMIpo5oppQgpMw5IGgpiWUERTEs0xKHII9YpRHKJAaCOUQEEaogEojVEFRGKJGmQIQEgEMCBAIYEgEICBAIQEyBCAgYtIRCtNb2jxbUcJXqJ860ytP8A9jkIn5sIHI+13F8RxHGPh6RqNQpuyU6KfIxQ2NRxsTfmdtLSzgezWLRNcq3GgCn87bz1HZfg6UF2GdgAxO9hsL+5PqZ7GhRUDaeXPly8tR68OHHxly+uP4/gWJVQ4TOCbEpZl/sZSPZquVz2Kkbb6eRE7RiMEj62seZXQn1muxFAWtb8t5m82TePDja5LwPjeL4XWLKC1IsBWpH5XUcx0bofrpO48NxtPE0Ur0jmp1UDodjY8iORGxHlOX8ewozmw01uLTdfC/iwyvgGAHdF6tG3/bLAup9GcEevlO3Hn5R5+bi8b6e/ktCtMTs4hIgkRkEiAsiYIhkQSIAGARGkQCICyIJEMiC0BTxLRzxTQyVeSCZJRpactLK1OWklDlj0iVj0EgcojUEBYxRDQ1hrMKIYEgIRgEFRDUQMgQwJgCGBAgEICQCZAgZtND2ycDCFTez1aSkDdgGz5ffJN/aeY7aYgd3lS7PScO4VScgZSFY2k3pZLelLgeIDL3j6ZycijmBoT7mbaj2jwiP3b1UVr2sTsehnnMM48CZKhSlRR2TKVFRibKB95RZiR+75g63iuCbE1gDSVaWS6vnHiey2TKNiLsDpyGpvPL63bXu1bjJHTQ6N4kYFT0M1+OamgJZgL6m/Seb7MpWoO+GAFT7FaqCrUZBTGYqVuFY20Fh59J5Lj+KrYzFNQJ7rIwpt4mdFINixNhp7RqVndxbDjmJpnMadRWNyLAi81HYSs1PidHlnNSm3mrI1v/oD6TTYjCikljTZGD5QzNfPpcm1ttZZ7PYoUMfhqjuERHps7toFQk+I+zH6GdMMZj05cuVynt3y0wRBw9ZKiK9Ng6OodHU3VlIuCIydnnLkIhGYMoAwTDIgmABEAiGYJgAYto0xTQFPFPGtFPDJMxMzEo01KWklWnLSSixTllJXpywkgcsagi0jVkaGohqIKxggGIawVENRAICGBMCGIGAIQkAhCQS01HEaIbvQAC7oFF/NdSfYTcCUuIYcmzrckaOBe5XkdOl5jkm56deLKTL39aKlh2cU61MAvTQoyXAFSm1iVB2DAqCCdNxpe42OHxSEG9OqjAeJWoupv0z2yn1DW85R4XV7sd3Y+Aldd7DabKtxOjTW9RlG84Y35Xpu+4Tw+kWqPWK5TUVURfu0kJsPUlmP06TneNVaXFKua7U6puWUZijka6DcaT0nEqhZ2rU/2hntlpgVXRUBIBIRdGPivcgzn1ValDFMKjvfvc5qPdiwHLyvrKbkeo4hQw2RnzUb5dWXKWt6DW/+aTwPGKyM91GUZfCDuAFCi/nZZ6jtJxCm6L3bXFuW20p9jOzv/wCjiwXB/Z8OFesbaMP9NK/Vuflfylx9xnks37dg7N0cmCwybZMLhwQdwe7W82UK0wRPQ8lYMEwpgyoAwTDMAwAMEwzAMADFNGtFNASYpoxolzAXeSCWmZWWmSWqZlNDLVOUXKcsrKtOWUkD0jliUjkkaMWMEBYxYBKI0QFhiAYhCYEyJAYmZgTIgZEzIJmB5PjVPuqzOdEcZwR1O/5gzTYnBtiSHBcBANENi7Xva9tLT0HaymxemRs6Oh+6SLEA/Ukek8pwviz0HenWQqL3VuW/5C36Tz5Yy5XT1Y5WYy1MWq00OfA4ip4rNVDuxIHXXNPIY3DivUApUqtBHI0ctlUfum5nuMd2hp6Xq01ufDZxa17XnnOMccp00OVkdztaza6b2MsxrWXLLjrbQPg2fEJhKQLvdaYAN8zsb3vyGvtO88G4cuFw9LDptSRUJAtma3ib3NzOTfCSi1biD1n8Zp0HdnPJ3ZVUD1Bf6Ts864x5srWIJhGCZpgJkMhmDKBMEwmgGABgtMtAYwBYxTmGxinMBTxLxjGKeGVcvMQ8oklGkQy5TlJN5dpyi3TlpJUpyykgsJHLErGrI0esYsSsapgNWGIsQ1gMEIQRMgwDEISjj+KYfDLmr1qdIcg7gMfRdz7TyPFPiZhadxhqb4huTP8AZU/zBY/SJLTb3wmn4z2nweDH29ZQ/Kml6lQ/hXb1NhORcY7Z8Qxdw1XukP8A08PemtvNr5j7m084409d/XrNTH/U27x2b4gOKUa9VgVpnEZKCkDNTVEQgm27EsxPkbcpruMcMGYpUWzW0I5jqD0ifg5Uvhayfdrhv4qaj/YZ6rj1fDkZKl3dDoKZGdCRe5PIW5c+m04cuG767duLk8fV6ch49wPJ40qNroL2bXpNJQ7K4rEElQci/PUc2RB5nmfIazrC4LBVaoFTEeFNSjJ3Zve2VmJ036e83HFVoYag1RwqUsOjNlUWAA5AdSdOpJkwxy/pvkzx/lxanxVuDYqgaADugqGurXUVUcBcrW2HhuOhUGdW7M9uMFxABUfua+xw9dlVyf8AwN7OPTXqBODcWxLYiu9Vt6jFrclHJR6DSV+729Z38Xnt2+pzMEzh3APiFjsIoSoRiqSiwWuzCoo6LUFz/EGnReC9vuH4oANU/Zqmxp4khBf/AMX+U/UHykuNNvUkzBMwrggEEEEXBBBBHUGYJgYJgEzJMAmBhjFsYTGLYwBYxTGGxinMAGMS5hOYpmlZDeSDeSBpKcuUzKSS3TlF2mZZQypTMsoZBaUxqmIUximGlhYxTFKYamQPUwxFKYwGAwGct7d9qsWuKq4WjUejSo5Ebu/BUdyoYtnHiA8QFgRtzvPVduePvgcMrUSgrVagRM4zWUAlmA200Gums47Xqu7O9Rmeo5LO7m7M3Umaxn1KxUdmJZmLMd2YlmJ8yd4B0hKJiqNJ0RlfXXpzhZbyLTuNdfKMAge7+FeMdatfDISrYhKZDgAimKYe7W6nMAP7T1vFuDJhFWrTLMjsVrmoQ7Fnuc5LddQb6XIPWeG+F9TLxNV+/Qqr9Mp/lOkdq8WoprRvq7gsAC3gTckAg7kfTynLL9NTpzviOJrNWGGwyl6jm4scxsy6EeIhtBu2ljE9t8RXwuGo8NqVmquQK1cE5u7U6U6OfdgLFtfLlaen7DPSFXHYqpvQFMZ2NyiKhLannYDmdt5zDjfEWxeKq4h96zlrH/Suyr7KAPaXH3UrTkazLC38Q/WHUXWAijMNN9us0g3WAVjjBKf5rA2HBO0OLwZ/4eqyLe5pv46J9UOg9RY+c6X2Y+IdDFuuHrL3OIc5VYa0aj8lDHVSeh9LzjtdiosASZWV3Uh1YBkIYZd1Km4P1EzVj6fJgMZEe6g9QD9RBYzKhYxZMImAxlAsYlzDYxbGAlzEsYxzK7mGWM0kTnkga1JbpmUqZlqmZRcpmWUMpoZZQyC2hjlMrIY5TDSwpjFMQpjFMB6mNUyupg43FLRpPVb5aSO7X6KpP8pByb4gcR/aMe6A3p4YCgg5Zt3b1zG34BPNZ7XU8xoZDUZ2Z31d2Z2PVmNz+ZMxX89uvSdZ6jIkOvrYwn1+sWh+U+3lpGqd5QVOGII0hCBv+wlXJxTCm/zVGQ/iRh+tp7LH4xqj1He5R3+ztYhRnIQ3Oh+a+u15zfhWM/Z8TRr8qNZHNul7H8jPeomTDghFcZRo2qZrWzk3N1LNrpfaYy7WNBiOIdxgcVTU/aYzFJSa1791TUu+5JIJdV8w08io/OWOIODUbLa2b/T8pNgCwHna8Uo0lxnoqtV01Ow5xNBLkueeig8h19YzEeJrcgdfM9IRIUEnlCI29pKmn6wcPrdjAevvYZmJyqPIbn6ky7CKqjdjp0vp/eJzG3hGRep3PpLHc63Y5m89h6CLqzNHeOw+NFbhuGcXutIUmuSTnp+Am565b+83ZM8H8I65bBVUJ/5eJa3kHRT+t57kmZaRjFMYTGKYwMMYpzCZol2hkDmIcw3MQ7QFlJJi8zA1dMy1TMo0zLdMyi6hlhDKaGPRpBcRo5GlRGj0aGlpTGKZXVo1WgWFM0Hb1yOG17PkuKanS+YNVQFfe9vebpWnkPibWcYREX/l1KyiobX+VSyKfcX/AAiJ2y5iNRv7cv7RbVG2+YdDo315ywlj/XaLrUTf5vTQX/p+U6jGHNxoLWbYixjlbWVaQIYgkm/p/KOJ/wA0gPuYStFK3+aTKGBnEfKfS897xXHlaCOWI+zputggLEBXUDyvlFwSNee88C50m14jxLPg8Oo2FMI17XLU7oxJB1vZNxM0ahTc9YbvbQbnbnYdfb+kTTawvBVr69dttoEuAedhtz/WV8RUzELsAQT56xlRjKiG7HeK0ud7lQn1iMNoLgZifmZjZeth5QMQb5UW55tvtHgNawQ6feIH95Pohcb3Fh9PrKdapfbbrH1lA3Fz9RKlU+RktSOofB2p9nil5h6LW9Qw/lOjsZzr4S8OKUauJz+GuwpCnb/t65i34yLWnv2aZissYtmkZolmlZZZop2kZop2gC7SuzTNRpXd5QWaSJzyQKFMy1TMpU2lpGgXEaOUyqjR6mBZRo9WlRDHoZBZRo1WlZTGq0NLKtPE/E/GWo0KAJu9VqrAfdRSov7uP4Z7JTOYfEHF95je7B0w9JE/E3jP5MsuPbLzyrcXGkw4PX9f6yU20t/WYqNp/nlOgqO9mB840vzlPFP+ois8ztdNmlUcjGk/0mmD5dRNhQrZliXZo930lam5yAHmWIHQEwK1XQ9eUgYD0UWhDmN/CPxekyze0RTfS/M6+3KSo+kDFZ7/AOf2iaRtrFs9zMZr+EczaZ20u4VP9XNtdeQ5CPdwBBpjT02mHTnp6kzTJDnmZXcBvve0dVf3PQCV6jseVhMVp1/4ZmoOHgOmVO9c0W2LoTqSP3swv5T1bNNN2TTLw/DC1vsEb+IZr/nNqzRGUZostMM0W7yjLPEO8wzxDPAlR5Wd4TvK7tAz3kkrZ5ICabSyjSlTaWUaBdRo9WlFHlhHgXEaORpURo5WgXEaNVpTRo9GkFhWnGOLYk1cTWqnXPVqEb/LmIUfQCdjRpw7GYgCrUGpvUqEZRcgFjNYhyv7GLqPpEqXb5WK/vLAqMyjxkG/3b3/AEl2MU8O1aoqLqztYdAOZ9ALme1w3YWlUQWZ05d43iZj0C7e00/YmgGrO7a5Qqr+I3P6D6zsHZ7AGoSbKVByBWF/Dvm1/wA0nmy3llqXWnpnjjhuzdri3FezDUiRSqd+Ba1qZRjc2tYnz9zp0vqsndkqxAOxFwbH1E77294dQSihAValWolNLAKzFr3Jtv8A3lzFYbC4PAVcRXo03Ap5mR6aHPyp0tRbUkD1bynSXV1252bm+nzgHu3veSvU0tzO/pNhiKId2fKiFmZitNQiLmN8qryUbCVHwpve95uy6YBSFoFapDseQvLNLgOLezLRezAFSbAEHY6mTKyRcZb1GsvLGCpktfkJ7XgfYpdGxDXa/wAgPhHqef6TS9oK1NcRURLLTpN3SKumiaHQdTmPvOeOUyvr43lx3HHd+q6+35TDiADYb6cucRVq3+8fTSdrXMupVJNkF+p5RPdMxC3zMxACjcsdAJlqjDZbCbTshhDXx9BSCQj943kE8X6gD3mLR2nDJ3dNKf3ERNNvCoH8plngs8U7zTI3eJd4DvEu8AneJd4LvEu8CO8Q7yO8rVHgTPJK95JAVJo9WkklDkaPRpJID0aPR5JIDleMV5JIDcxtpvbT1nEaFQkDnexJ5k9ZJJYCatocuw3Y+W9hFoBpbdhe7am0zJAv8KxVTDFitjnA35W5+us23Du3GPwlW61cyZSClSzaC5Cg5dLcv12tJJmybb3em/4NxurxjiNJ6xJpUWC0l8IuxtmcgWte17enSek+MeNK0MPQBP2tR6h81RbAH3e/tJJOeH6ref5jkbETFtZJJ2cyEpglj0OUeQ0/rLtHHYikPBWqKBZSubMoA0Fg17ctpiSSyXsls6bBO0+LWwvSaw+ZkOZtOdiB9AJocSneVKjkANUZ6nUAlr2F/WSSJhjOi55ZdgR9CrbqbXHWZbQ7/WSSBUr1Ok9r8MsN4q9cjUBKS+/ib9FkkmZ2Xp713iHeSSaZDminaSSAh2inaYkhCGaIqNJJCkZpJJIR/9k="
                      alt=""
                    />
                  </div>
                </span>
                <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                  <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                    1 day ago
                  </time>
                  <div className="text-sm font-normal text-gray-500 lex ">
                    Jese Leos has changed{" "}
                    <a
                      href="#"
                      className="font-semibold text-blue-600  hover:underline"
                    >
                      Pricing page
                    </a>{" "}
                    task status to{" "}
                    <span className="font-semibold text-gray-900 ">
                      Finished
                    </span>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div className="w-2/4 bg-white rounded-md p-4 h-screen overflow-auto">
          <div className="font-bold text-lg tracking-wide">Notes</div>
          <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
          {!isPending ? <div className="px-4 py-2 full space-y-2">
            {pipeline && pipeline.map((item) => (
              <div
                key={item.id}
                className={`py-4 px-10 flex justify-between place-items-center w-full border rounded-md border-t-4 ${
                  item.id % 2 == 0 ? "border-t-orange-500" : "border-t-blue-500"
                }`}
              >
                <div className="flex place-items-center gap-3">
                  <div className="">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="data:image/jpeg;base64,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"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="flex gap-4">
                      <div className="font-bold text-gray-500 text-sm">
                        {timeAgo.format(item.time_stamp)}
                        {/* {item.time_stamp} */}
                      </div>{" "}
                      <div className="font-bold text-gray-500 text-sm">
                        Yash Barman
                      </div>
                    </div>
                    <div className="">{item.text}</div>
                  </div>
                </div>
                <div>
                  <MdDelete
                    onClick={() => deletePipeline(item.id)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>:
          <div className="grid place-items-center h-96 bg-white">
          <div><ClockLoader color="#FFD700" /></div>
        </div>
          }
          <form
            onSubmit={handleSubmit}
            className="p-4 space-y-2 border-2 rounded-md border-gray-500"
          >
            <input
              className="block focus:outline-0 px-4 py-2 text-lg border-b-2 w-full border-b-gray-500  "
              type="text"
              value={title}
              placeholder="Enter New Note title"
              onChange={(e) => settitle(e.target.value)}
            />
            <input
              className="block focus:outline-0 px-4 py-2 text-lg border-b-2 w-full border-b-gray-500  "
              type="text"
              value={newPipeline}
              placeholder="Enter New Note description"
              onChange={(e) => setnewPipeline(e.target.value)}
            />
            <button className="border-2 border-green-800 bg-green-100 text-sm text-green-800 rounded-md px-8 py-2 font-semibold">
              Add Note
            </button>
          </form>
        </div>
      </div>
      <div className={tabs === 2 ? "flex gap-3" : "hidden"}>
        <div className="h-full w-[75%] bg-white rounded-md grid grid-col-1 divide-y">
          <div className="p-4 gap-2">
            <div className="text-md font-bold">Job Title</div>
            <div className="text-xl font-semibold tracking-widest text-gray-600">
              {location.state.job.title}
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <div className="font-bold">Job Description</div>
              <div className="flex gap-3">
                <button className="text-gray-500 text-md font-bold px-4 py-1">
                  Cancel
                </button>
                <button className="font-bold text-md px-4 py-1 rounded-md bg-green-800 text-white">
                  Save
                </button>
              </div>
            </div>
            <div className="p-4">
              <DefaultEditor
                value={content}
                onChange={(e) => setcontent(e.target.value)}
              />
            </div>
          </div>
          <div className="p-4">
            <div className="font-bold ">Skills</div>
            <div className="flex my-2 gap-2">
              <div className="rounded-full bg-gray-300 font-bold p-2 text-md text-gray-500">
                UI Design
              </div>
              <div className="rounded-full bg-gray-300 font-bold p-2 text-md text-gray-500">
                UI Design
              </div>
              <div className="rounded-full bg-gray-300 font-bold p-2 text-md text-gray-500">
                UI Design
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="font-bold ">Attachment</div>
            <div>
              <input type="file" accept=".pdf" onChange={onChange} />
            </div>
            <div>
              {url && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                  <Viewer fileUrl={url} />
                </Worker>
              )}
            </div>
          </div>
        </div>
        <div className="h-96 w-[35%] bg-white rounded-md p-2 ">
          <div className=" font-bold p-4">Job details</div>
          <hr className="h-px bg-gray-200 border-0 "></hr>
          <div className="p-4">
            <div className="font-bold text-md text-gray-400">
              Job Creation Date
            </div>
            <div className="font-semibold  mb-4">
              {location.state.job.publishData}
            </div>
            <div className="font-bold text-md text-gray-400">
              Recuritment period
            </div>
            <div className="font-semibold  mb-4">March 15 to March 30</div>
            <div className="font-bold text-md text-gray-400">
              Hiring Manager
            </div>
            <div className="font-semibold text-md flex place-items-center gap-2 mb-4">
              <div>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
              </div>
              <div>Yash Barman</div>
            </div>
            <div className="font-bold textsm text-gray-400">Job Type</div>
            <div className="font-semibold  mb-4">Fulltime</div>
            <div className="font-bold text-md text-gray-400">Location</div>
            <div className="font-semibold">Bangluru, Karnataka</div>
          </div>
        </div>
      </div>
      <div className={tabs === 4 ? "p-4 rounded-md" : "hidden"}>
        <Myfb />
      </div>
      <div className={tabs === 5 ? " p-4 rounded-md bg-white" : "hidden"}>
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
              <div className="font-bold text-gray-500">Personal:{PERSONAL}</div>
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
                        <div className="font-bold text-lg">{card.title}</div>
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
                    onChange={(e) => setPERSONAL(scoreCardData.PERSONAL.length)}
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
                        <div className="font-bold text-lg">{card.title}</div>
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
                        <div className="font-bold text-lg">{card.title}</div>
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
                              e.target.checked ? MANAGEMENT + 1 : MANAGEMENT - 1
                            )
                          }
                        />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{card.title}</div>
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
                              e.target.checked ? LEADERSHIP + 1 : LEADERSHIP - 1
                            )
                          }
                        />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{card.title}</div>
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
                        <div className="font-bold text-lg">{card.title}</div>
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
                <input
                  type="text"
                  placeholder="Enter Title"
                  className=" p-3 w-full rounded-md bg-gray-200"
                />
              </div>
              <div className="my-4">
                <div className="font-bold">Hint</div>
                <input
                  type="text"
                  placeholder="Enter Hint For the interviewer"
                  className=" p-3 w-full rounded-md bg-gray-200"
                />
              </div>
              <div className="my-4">
                <div className="font-bold">MAR(Minimum Acceptable Rating)</div>
                <input
                  type="number"
                  placeholder="Give Rating From 1 to 5"
                  className=" p-3 w-full rounded-md bg-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsDetailed;
