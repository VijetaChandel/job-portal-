import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Recruiter/Dashboard';
import PostJob from './pages/Recruiter/PostJob';
import MyJobs from './pages/Recruiter/MyJobs';
import EditJob from './pages/Recruiter/EditJob';
import JobApplicants from './pages/Recruiter/JobApplicants';
import Settings from './pages/Recruiter/Settings';
import AdminOverview from './pages/Recruiter/AdminOverview';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <ProtectedRoute requiredRole="student">
            <Profile />
          </ProtectedRoute>
        } />

        {/* Recruiter Routes - Protected */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute requiredRole="recruiter">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="edit-job/:jobId" element={<EditJob />} />
          <Route path="jobs/:jobId/applicants" element={<JobApplicants />} />
          <Route path="settings" element={<Settings />} />
          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
