import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Calendar from "./pages/Calendar";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Referrals from "./pages/Referrals";
import Career from "./pages/Career";
import Employee from "./pages/Employee";
import Structure from "./pages/Structure";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RSidebar from "./components/RSidebar";
import JobsDetailed from "./pages/JobsDetailed";
import NewJob from "./pages/NewJob";
import EmailEditorr from "./components/EmailEditorr";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative">
          <div className="w-52 fixed dark:bg-secondary-dark-bg ">
            <Sidebar />
          </div>
          <div className="min-h-full ml-52 w-full  ">
            <div className="sticky bg-white border top-0 w-full ">
              <Navbar />
            </div>
            <div className="flex">
                <div className="w-full  mr-14">
                  <Routes>
                    {/* dashboard  */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/calendar" element={<Calendar />} />

                    {/* recuriment  */}
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route path="/referrals" element={<Referrals />} />
                    <Route path="/career" element={<Career />} />

                    {/* organization  */}
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/structure" element={<Structure />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/settings" element={<Settings />} />

                    {/* pages */}
                    <Route path="/job-detailed" element={<JobsDetailed />} />
                    <Route path="/new-job" element={<NewJob />} />
                    <Route path="/email" element={<EmailEditorr />} />
                  </Routes>
                </div>
              <div className="fixed right-0 h-full w-14">
                <RSidebar />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
