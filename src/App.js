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
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative">
          <Auth>
            <div className="w-52 fixed dark:bg-secondary-dark-bg ">
              <Sidebar />
            </div>
          </Auth>
          <div className="min-h-full ml-52 w-full " >
            <Auth>
              <div className="sticky bg-white border top-0 w-full ">
                <Navbar />
              </div>
            </Auth>
            <div className="flex">
              <div className="w-full  mr-14">
                <Routes>
                  {/* dashboard  */}
                  <Route
                    path="/"
                    element={<Auth><Dashboard /></Auth>}
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <Auth>
                        <Dashboard />
                      </Auth>
                    }
                  />
                  <Route
                    path="/inbox"
                    element={
                      <Auth>
                        <Inbox />
                      </Auth>
                    }
                  />
                  <Route
                    path="/calendar"
                    element={
                      <Auth>
                        <Calendar />
                      </Auth>
                    }
                  />

                  {/* recuriment  */}
                  <Route
                    path="/jobs"
                    element={
                      <Auth>
                        <Jobs />
                      </Auth>
                    }
                  />
                  <Route
                    path="/candidates"
                    element={
                      <Auth>
                        <Candidates />
                      </Auth>
                    }
                  />
                  <Route
                    path="/applicantval"
                    element={
                      <Auth>
                        <ApplicantVal />
                      </Auth>
                    }
                  />
                  <Route
                    path="/applicant/:id"
                    element={
                      <Auth>
                        <Applicant />
                      </Auth>
                  }
                  />
                  <Route
                    path="/applicant/pdf/:id"
                    element={
                      <Auth>
                        <ApplicantPdfInvoice />
                      </Auth>
                  }
                  />
                  <Route
                    path="/referrals"
                    element={
                      <Auth>
                        <Referrals />
                      </Auth>
                  }
                  />
                  <Route
                    path="/career"
                    element={
                      <Auth>
                        <Career />
                      </Auth>
                  }
                  />

                  {/* organization  */}
                  <Route
                    path="/employee"
                    element={
                      <Auth>
                        <Employee />
                      </Auth>
                  }
                  />
                  <Route
                    path="/structure"
                    element={
                      <Auth>
                        <Structure />
                      </Auth>
                  }
                  />
                  <Route
                    path="/report"
                    element={
                      <Auth>
                        <Report />
                      </Auth>
                  }
                  />
                  <Route
                    path="/settings"
                    element={
                      <Auth>
                        <Settings />
                      </Auth>
                  }
                  />

                  {/* pages */}
                  <Route
                    path="/job-detailed"
                    element={
                      <Auth>
                        <JobsDetailed />
                      </Auth>
                  }
                  />
                  <Route
                    path="/new-job"
                    element={
                      <Auth>
                        <NewJob />
                      </Auth>
                  }
                  />
                  <Route
                    path="/inbox/email"
                    element={
                      <Auth>
                        <EmailEditorr />
                      </Auth>
                  }
                  />
                  <Route
                    path="/employee/group-email"
                    element={
                      <Auth>
                        <GroupEmail />
                      </Auth>
                  }
                  />
                  <Route
                    path="/candidates/group-email"
                    element={
                      <Auth>
                        <GroupEmail />
                      </Auth>
                  }
                  />
                  <Route
                    path="/signup"
                    element={<Signup />}
                  />
                  <Route
                    path="/login"
                    element={<Login />}
                  />
                </Routes>
              </div>
              <Auth>
                <div className="fixed right-0 h-full w-14">
                  <RSidebar />
                </div>
              </Auth>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
