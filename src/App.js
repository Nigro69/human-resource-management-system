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
import GroupEmail from "./pages/GroupEmail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useStateContext } from "./context/ContextProvider";
import ApplicantVal from "./pages/ApplicantVal";
import Applicant from "./pages/Applicant";
import ApplicantPdfInvoice from "./pages/ApplicantPdfInvoice";

function App() {
  const { authToken } = useStateContext();
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative">
          {authToken && (
            <div className="w-52 fixed dark:bg-secondary-dark-bg ">
              <Sidebar />
            </div>
          )}
          <div className={`${authToken ? "min-h-full ml-52 w-full ": "h-full w-full"}`} >
            {authToken && (
              <div className="sticky bg-white border top-0 w-full ">
                <Navbar />
              </div>
            )}
            <div className="flex">
              <div className={`${authToken ? "w-full  mr-14" : "h-full w-full"}`}>
                <Routes>
                  {/* dashboard  */}
                  <Route
                    path="/"
                    element={authToken ? <Dashboard /> : <Login />}
                  />
                  <Route
                    path="/dashboard"
                    element={authToken ? <Dashboard /> : <Login />}
                  />
                  <Route
                    path="/inbox"
                    element={authToken ? <Inbox /> : <Login />}
                  />
                  <Route
                    path="/calendar"
                    element={!authToken ? <Login /> : <Calendar />}
                  />

                  {/* recuriment  */}
                  <Route
                    path="/jobs"
                    element={!authToken ? <Login /> : <Jobs />}
                  />
                  <Route
                    path="/candidates"
                    element={!authToken ? <Login /> : <Candidates />}
                  />
                  <Route
                    path="/applicantval"
                    element={<ApplicantVal/>}
                  />
                  <Route
                    path="/applicant/:id"
                    element={<Applicant/>}
                  />
                  <Route
                    path="/applicant/pdf/:id"
                    element={<ApplicantPdfInvoice/>}
                  />
                  <Route
                    path="/referrals"
                    element={!authToken ? <Login /> : <Referrals />}
                  />
                  <Route
                    path="/career"
                    element={!authToken ? <Login /> : <Career />}
                  />

                  {/* organization  */}
                  <Route
                    path="/employee"
                    element={!authToken ? <Login /> : <Employee />}
                  />
                  <Route
                    path="/structure"
                    element={!authToken ? <Login /> : <Structure />}
                  />
                  <Route
                    path="/report"
                    element={!authToken ? <Login /> : <Report />}
                  />
                  <Route
                    path="/settings"
                    element={!authToken ? <Login /> : <Settings />}
                  />

                  {/* pages */}
                  <Route
                    path="/job-detailed"
                    element={!authToken ? <Login /> : <JobsDetailed />}
                  />
                  <Route
                    path="/new-job"
                    element={!authToken ? <Login /> : <NewJob />}
                  />
                  <Route
                    path="/inbox/email"
                    element={!authToken ? <Login /> : <EmailEditorr />}
                  />
                  <Route
                    path="/employee/group-email"
                    element={!authToken ? <Login /> : <GroupEmail />}
                  />
                  <Route
                    path="/candidates/group-email"
                    element={!authToken ? <Login /> : <GroupEmail />}
                  />
                  {!authToken && <Route
                    path="/signup"
                    element={<Signup/>}
                  />}
                  {!authToken && <Route
                    path="/login"
                    element={<Login/>}
                  />}
                </Routes>
              </div>
              {authToken && <div className="fixed right-0 h-full w-14">
                <RSidebar />
              </div>}
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
