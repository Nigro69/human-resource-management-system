import { MdDashboard } from "react-icons/md";
import { SiBiolink } from "react-icons/si";
import { HiInboxIn } from "react-icons/hi";
import {
  BsFillCalendarCheckFill,
  BsFillPersonFill,
  BsKanban,
} from "react-icons/bs";
import { RiContactsLine, RiSuitcaseFill } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { TbReport } from "react-icons/tb";

export const links = [
  {
    title: "",
    links: [
      {
        name: "dashboard",
        icon: <MdDashboard />,
      },
      {
        name: "inbox",
        icon: <HiInboxIn />,
      },
      {
        name: "calendar",
        icon: <BsFillCalendarCheckFill />,
      },
    ],
  },

  {
    title: "RECRUITMENT",
    links: [
      {
        name: "jobs",
        icon: <RiSuitcaseFill />,
      },
      {
        name: "candidates",
        icon: <IoMdPeople />,
      },
      {
        name: "referrals",
        icon: <SiBiolink />,
      },
      {
        name: "career",
        icon: <RiContactsLine />,
      },
    ],
  },
  {
    title: "ORGANIZATION",
    links: [
      {
        name: "employee",
        icon: <BsFillPersonFill />,
      },
      {
        name: "structure",
        icon: <BsKanban />,
      },
      {
        name: "report",
        icon: <TbReport />,
      },
      {
        name: "settings",
        icon: <AiFillSetting />,
      },
    ],
  },
];

export const appointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2023, 0, 25, 9, 35),
    endDate: new Date(2023, 0, 25, 11, 30),
    id: 0,
    location: "Room 1",
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2023, 0, 25, 12, 11),
    endDate: new Date(2023, 0, 25, 13, 0),
    id: 1,
    location: "Room 1",
  },
  {
    title: "Install New Router in Dev Room",
    startDate: new Date(2023, 0, 25, 14, 30),
    endDate: new Date(2023, 0, 25, 15, 35),
    id: 2,
    location: "Room 2",
  },
  {
    title: "Approve Personal Computer Upgrade Plan",
    startDate: new Date(2023, 0, 26, 10, 0),
    endDate: new Date(2023, 0, 26, 11, 0),
    id: 3,
    location: "Room 2",
  },
  {
    title: "Final Budget Review",
    startDate: new Date(2023, 0, 26, 12, 0),
    endDate: new Date(2023, 0, 26, 13, 35),
    id: 4,
    location: "Room 2",
  },
  {
    title: "New Brochures",
    startDate: new Date(2023, 0, 26, 14, 30),
    endDate: new Date(2023, 0, 26, 15, 45),
    id: 5,
    location: "Room 2",
  },
  {
    title: "Install New Database",
    startDate: new Date(2023, 0, 27, 9, 45),
    endDate: new Date(2023, 0, 27, 11, 15),
    id: 6,
    location: "Room 1",
  },
  {
    title: "Approve New Online Marketing Strategy",
    startDate: new Date(2023, 0, 27, 12, 0),
    endDate: new Date(2023, 0, 27, 14, 0),
    id: 7,
    location: "Room 3",
  },
  {
    title: "Upgrade Personal Computers",
    startDate: new Date(2023, 0, 27, 15, 15),
    endDate: new Date(2023, 0, 27, 16, 30),
    id: 8,
    location: "Room 3",
  },
  {
    title: "Customer Workshop",
    startDate: new Date(2023, 0, 28, 11, 0),
    endDate: new Date(2023, 0, 28, 12, 0),
    id: 9,
    location: "Room 3",
  },
  {
    title: "Prepare 2015 Marketing Plan",
    startDate: new Date(2023, 0, 28, 11, 0),
    endDate: new Date(2023, 0, 28, 13, 30),
    id: 10,
    location: "Room 1",
  },
  {
    title: "Brochure Design Review",
    startDate: new Date(2023, 0, 28, 14, 0),
    endDate: new Date(2023, 0, 28, 15, 30),
    id: 11,
    location: "Room 2",
  },
  {
    title: "Create Icons for Website",
    startDate: new Date(2023, 0, 29, 10, 0),
    endDate: new Date(2023, 0, 29, 11, 30),
    id: 12,
    location: "Room 2",
  },
  {
    title: "Upgrade Server Hardware",
    startDate: new Date(2023, 0, 29, 14, 30),
    endDate: new Date(2023, 0, 29, 16, 0),
    id: 13,
    location: "Room 3",
  },
  {
    title: "Submit New Website Design",
    startDate: new Date(2023, 0, 29, 16, 30),
    endDate: new Date(2023, 0, 29, 18, 0),
    id: 14,
    location: "Room 3",
  },
  {
    title: "Launch New Website",
    startDate: new Date(2023, 0, 29, 12, 20),
    endDate: new Date(2023, 0, 29, 14, 0),
    id: 15,
    location: "Room 2",
  },
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2023, 1, 2, 9, 30),
    endDate: new Date(2023, 1, 2, 15, 30),
    id: 16,
    location: "Room 1",
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2023, 1, 2, 12, 0),
    endDate: new Date(2023, 1, 2, 13, 0),
    id: 17,
    location: "Room 3",
  },
];

export const hiringPipelineData = {
  Design: {
    jobs: [
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },

    ],
    columns: [
      "New Applied",
      "Screening",
      "Challanges",
      "Inerview",
      "Test",
      "Hired",
    ],
    data: [
      [34,23,40,20,17,6],
      [34,23,40,20,17,6],
      [34,23,40,20,17,6],
      [0,0,40,20,17,0],
      [0,0,0,20,0,0],
      [0,0,0,0,0,0],
    ],
  },
  Development: {
    jobs: [
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },

    ],
    columns: [
      "New Applied",
      "Screening",
      "Challanges",
      "Inerview",
      "Test",
      "Hired",
    ],
    data: [
      [34,23,40,20,17,6],
      [34,23,40,20,17,6],
      [34,23,40,20,17,6],
      [0,0,40,20,17,0],
      [0,0,0,20,0,0],
      [0,0,0,0,0,0],
    ],
  },
  QnA: {
    jobs: [
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },
      {
        title: "Senior Product Designer",
        applicants: 126,
      },

    ],
    columns: [
      "Applied",
      "Screening",
      "Challanges",
      "Inerview",
      "Test",
      "Hired",
    ],
    data: [
      [34,23,40,20,17,6],
      [34,23,40,20,17,6],
      [34,23,40,20,17,6],
      [0,0,40,20,17,0],
      [0,0,0,20,0,0],
      [0,0,0,0,0,0],
    ],
  },
};

export const jobsData={
   data : [
    ["Jobs", "Overall"],
    ["Published", 11],
    ["Internal", 2],
    ["Private", 2],
    ["On Hold", 2],
    ["Closed", 7],
  ],
  options :{
    legend:{alignment:'center',position:'right'},
    chartArea:{width:'100%',height:'100%'},
    colors:['#4285F4','#DB4437','#F4B400','#0F9D58','#FF731D','#FF577F'],
    pieHole: 0.4,
    is3D: false,
  }
}

export const tasksData=[
  {
    id:1,
    title:"InterView with the candidates",
    time:"07:00 07:45 Am",

  },
  {
    id:2,
    title:"Conduct the test",
    time:"08:00 08:45 Am",

  },
  {
    id:3,
    title:"Candidate Screening",
    time:"12:00 10:00 Pm",

  },
  {
    id:4,
    title:"Submit finance requritment report",
    time:"02:00 02:15 Pm",

  },
  {
    id:5,
    title:"Change the logo aof Career Site",
    time:"04:50 06:45 Pm",

  },
]

export const jobsMainData=[
  {
    id:1,
    category:"design",
    title:"Senior Product Designer",
    candidates:{
      new:3,
      total:57
    },
    location:"Banglore",
    type:"Fulltime",
    status:"Published",
    publishData:"2023-01-29"
  },
  {
    id:2,
    category:"design",
    title:"UX/UI Developer",
    candidates:{
      new:6,
      total:10
    },
    location:"Banglore",
    type:"Fulltime",
    status:"Draft",
    publishData:"2023-02-29"
  },
  {
    id:3,
    category:"development",
    title:"Senior Developer",
    candidates:{
      new:10,
      total:60
    },
    location:"Banglore",
    type:"Fulltime",
    status:"Published",
    publishData:"2023-02-30"
  },
  {
    id:4,
    category:"Development",
    title:"Junior Deeveloper",
    candidates:{
      new:23,
      total:55
    },
    location:"Banglore",
    type:"Part-Time",
    status:"Draft",
    publishData:"2023-01-29"
  },
  {
    id:5,
    category:"Marketing",
    title:"Copywriter",
    candidates:{
      new:4,
      total:9
    },
    location:"Banglore",
    type:"Part-time",
    status:"Draft",
    publishData:"2023-01-20"
  },
  {
    id:6,
    category:"Developer",
    title:"React Developer",
    candidates:{
      new:7,
      total:13
    },
    location:"Banglore",
    type:"Fulltime",
    status:"Published",
    publishData:"2023-02-02"
  },
  {
    id:7,
    category:"Development",
    title:"Senior Backend Developer",
    candidates:{
      new:4,
      total:15
    },
    location:"Banglore",
    type:"Fulltime",
    status:"Published",
    publishData:"2023-02-21"
  },
]

export const candidatesData = [
  {
    id:1,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    stage: "Screening",
    appliedData:"01 March 2022",
    jobTitle:"1",
    age: 27,
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:2,
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    stage: "Screening",
    appliedData:"01 March 2022",
    jobTitle:"1",
    age: 43,
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    stage: "Interview",
    appliedData:"03 Feb 2022",
    jobTitle:"2",
    age: 32,
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:4,
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    stage: "Interview",
    appliedData:"03 Feb 2022",
    jobTitle:"2",
    age: 29,
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:5,
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    stage: "Interview",
    appliedData:"06 Feb 2022",
    jobTitle:"2",
    age: 36,
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:6,
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    stage: "Test",
    appliedData:"03 Jan 2023",
    jobTitle:"4",
    age: 24,
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

export const employeeData=[
  {
    id:1,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    team: "Development",
    hiredDate:"01 March 2022",
    jobTitle:"1",
    status:"Active",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:2,
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    team: "Design",
    hiredDate:"01 February 2022",
    status:"Active",
    jobTitle:"2",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    team: "Marketing",
    hiredDate:"01 April 2022",
    status:"Inactive",
    jobTitle:"2",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:4,
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    team: "Marketing",
    hiredDate:"01 April 2022",
    status:"Inactive",
    jobTitle:"2",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:5,
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    team: "MarkDevelopmenteting",
    hiredDate:"06 December 2022",
    status:"Unverified",
    jobTitle:"2",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id:6,
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    team: "Marketing",
    hiredDate:"01 March 2022",
    status:"Active",
    jobTitle:"4",
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

export const chats=[
  {
    chatId:2,
    messages:[
      {
        id:1,
        body:"Good Evening, Yash. Jane this side.",
        timeStamp:1676241656830,
        myMsg:false,
      },
      {
        id:2,
        body:"Hey Jane",
        timeStamp:1676241656830,
        myMsg:true,
      },
    ]
  },
  {
    chatId:3,
    messages:[
      {
        id:1,
        body:"Good Evening, Yash. Cody this side.",
        timeStamp:1676241656830,
        myMsg:false,
      },
      {
        id:2,
        body:"Hey Cody",
        timeStamp:1676241656830,
        myMsg:true,
      },
    ]
  },
  {
    chatId:4,
    messages:[
      {
        id:1,
        body:"Good Evening, Yash. Esther this side.",
        timeStamp:1676241656830,
        myMsg:false,
      },
      {
        id:2,
        body:"Hey Esther",
        timeStamp:1676241656830,
        myMsg:true,
      },
    ]
  },
  {
    chatId:5,
    messages:[
      {
        id:1,
        body:"Good Evening, Yash. Jenny  this side.",
        timeStamp:1676241656830,
        myMsg:false,
      },
      {
        id:2,
        body:"Hey Jenny ",
        timeStamp:1676241656830,
        myMsg:true,
      },
    ]
  },
  {
    chatId:6,
    messages:[
      {
        id:1,
        body:"Good Evening, Yash. Kristin  this side.",
        timeStamp:1676241656830,
        myMsg:false,
      },
      {
        id:2,
        body:"Hey Kristin ",
        timeStamp:1676241656830,
        myMsg:true,
      },
    ]
  },
  {
    chatId:7,
    messages:[
      {
        id:1,
        body:"Good Evening, Yash. Cameron  this side.",
        timeStamp:1676241656830,
        myMsg:false,
      },
      {
        id:2,
        body:"Hey Cameron ",
        timeStamp:1676241656830,
        myMsg:true,
      },
    ]
  },
]

export const scoreCadData=[

]

export const scoreCardData={
  INTELLECTUAL:[
    {
      id:1,
      checked:false,
      title:"Intelligence",
      subTitle:"Ability to acquire understanding & absorb information rapidly. A quick study",
      mar:5,
    },
    {
      id:2,
      checked:false,
      title:"Analysis Skills",
      subTitle:"Indentifies significant problems & opportunities. Analyzes problems and people in depth. Sorts the wheat from the chaff, determining root causes",
      mar:5,
    },
    {
      id:3,
      checked:false,
      title:"Judgment/Decision Making",
      subTitle:"Consistent logic, rationality & objectivity in decision making. Neither indecisive nor hip-shooter.",
      mar:5,
    },
    {
      id:4,
      checked:false,
      title:"Conceptual Ability",
      subTitle:" Deals effectively with not just concrete, tangible issues but with abstract, conceptual matters",
      mar:4,
    },
    {
      id:5,
      checked:false,
      title:"Creativity ",
      subTitle:"Generates new approaches to problems or innovations to established best practices. Shows imagination",
      mar:4,
    },
    {
      id:6,
      checked:false,
      title:"Strategic Skills",
      subTitle:"Determines opportunities & threats through comprehensive analysis of current & future trends. Comprehends the big picture.",
      mar:5,
    },
    {
      id:7,
      checked:false,
      title:"Pragmatism",
      subTitle:"Generates sensible, realistic, practical solutions to problems.",
      mar:5,
    },
    {
      id:8,
      checked:false,
      title:"Risk Taking",
      subTitle:"Takes calculated risks, with generally favorable outcomes. Does not “bet the farm",
      mar:4,
    },
    {
      id:9,
      checked:false,
      title:"Leading Edge",
      subTitle:"Constantly benchmarks best practices & expects others to do same. ",
      mar:5,
    },
    {
      id:10,
      checked:false,
      title:"Education",
      subTitle:"Meets formal & informal educational requirements.Exhibits continuous learning",
      mar:4,
    },
    {
      id:11,
      checked:false,
      title:"Experience",
      subTitle:"Job specific",
      mar:5,
    },
    {
      id:12,
      checked:false,
      title:"Track Record",
      subTitle:"Successful career history. Generally earns performance ratings of excelent. ",
      mar:5,
    },
  ],
  PERSONAL:[
    {
      id:1,
      checked:false,
      title:"Resourcefulness/Initiative",
      subTitle:"Passionately finds ways over, around, or through barriers to success. Achieves results despite lack of resources. Goes beyond the call of duty. Shows bias for action. A results-oriented",
      mar:5,
    },
    {
      id:2,
      checked:false,
      title:"Organization/Planning",
      subTitle:"Plans, organizes, schedules & budgets in efficient,organized manner. Focuses on key priorities",
      mar:5,
    },
    {
      id:3,
      checked:false,
      title:"Excellence",
      subTitle:"Sets high stretch standards of performance for self and others. Low tolerance for mediocrity. High sense of responsibility",
      mar:5,
    },
    {
      id:4,
      checked:false,
      title:"Independence",
      subTitle:"Willingness to take an independent stand. Not swayed by last person talked with",
      mar:4,
    },
    {
      id:5,
      checked:false,
      title:"Stress Management ",
      subTitle:"Stable & poised under pressure",
      mar:4,
    },
    {
      id:6,
      checked:false,
      title:"Self-Awareness/ Feedback",
      subTitle:"Recognizes own strengths & weaknesses. Not defensive. Does not rationalize mistakes or blame others. Uses feedback mechanisms",
      mar:5,
    },
    {
      id:7,
      checked:false,
      title:"Adaptability",
      subTitle:"Not rigid. Copes effectively with complexity and change.",
      mar:5,
    },
  ],
  INTERPERSONAL:[],
  MANAGEMENT:[],
  LEADERSHIP:[],
  MOTIVATIONAL:[],
}

export const templateData= [
  {
    id:1,
    title:"New employee announcement",
    body:"Hi [Employee Name]! We're thrilled to have [Employee Name] join our team as [Role]. [Employee Name] has [Number of Years] of experience working in [Specific Industry] and we can't wait to see what they'll bring to our team. Outside of [Employee Name]'s professional experience, they also enjoy [List activities, hobbies, etc.]. Make sure to give [Employee Name] a big [Company Name] welcome the next time you see them. Welcome to the team, [Employee Name]! Kindly,  HR"
  },
]
