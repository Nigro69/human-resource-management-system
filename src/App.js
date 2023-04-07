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
import Auth from "./components/Auth"
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* dashboard  */}
          <Route
            path="/"
            element={
              <Auth>
                <Layout>
                  <Dashboard />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Auth>
                <Layout>
                  <Dashboard />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/inbox"
            element={
              <Auth>
                <Layout>
                  <Inbox />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/calendar"
            element={
              <Auth>
                <Layout>
                  <Calendar />
                </Layout>
              </Auth>
            }
          />

          {/* recuriment  */}
          <Route
            path="/jobs"
            element={
              <Auth>
                <Layout>
                  <Jobs />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/candidates"
            element={
              <Auth>
                <Layout>
                  <Candidates />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/applicantval"
            element={
              <Auth>
                <Layout>
                  <ApplicantVal />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/applicant/:id"
            element={
              <Auth>
                <Layout>
                  <Applicant />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/applicant/pdf/:id"
            element={
              <Auth>
                <Layout>
                  <ApplicantPdfInvoice />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/referrals"
            element={
              <Auth>
                <Layout>
                  <Referrals />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/career"
            element={
              <Auth>
                <Layout>
                  <Career />
                </Layout>
              </Auth>
            }
          />

          {/* organization  */}
          <Route
            path="/employee"
            element={
              <Auth>
                <Layout>
                  <Employee />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/structure"
            element={
              <Auth>
                <Layout>
                  <Structure />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/report"
            element={
              <Auth>
                <Layout>
                  <Report />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/settings"
            element={
              <Auth>
                <Layout>
                  <Settings />
                </Layout>
              </Auth>
            }
          />

          {/* pages */}
          <Route
            path="/job-detailed"
            element={
              <Auth>
                <Layout>
                  <JobsDetailed />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/new-job"
            element={
              <Auth>
                <Layout>
                  <NewJob />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/inbox/email"
            element={
              <Auth>
                <Layout>
                  <EmailEditorr />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/employee/group-email"
            element={
              <Auth>
                <Layout>
                  <GroupEmail />
                </Layout>
              </Auth>
            }
          />
          <Route
            path="/candidates/group-email"
            element={
              <Auth>
                <Layout>
                  <GroupEmail />
                </Layout>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
