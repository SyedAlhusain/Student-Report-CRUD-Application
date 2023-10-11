// Import React and necessary components from React Router
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import page components for different routes
import ListUserPage from "./pages/ListUserPage";
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';

import ListInstructorPage from './pages/ListInstructorPage';
import CreateInstructor from './pages/CreateInstructor';
import EditInstructor from './pages/EditInstructor';

import ListCoursePage from './pages/ListCoursePage';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';

import ListEnrollmentPage from './pages/ListEnrollmentPage';
import CreateEnrollment from './pages/CreateEnrollment';
import EditEnrollment from './pages/EditEnrollment';

function App() {
  return (
    // Main application component
    <div className="vh-100 gradient-custom">
      <div className="container">
        <h1 className="page-header text-center">Student Report Card - Syed Husain </h1>
        <h1  className="page-header text-center">Class: CMSC 447</h1>

        {/* Navigation buttons for different sections */}
        <button onClick={() => window.location.href = '/student'}>Student</button>
        <button onClick={() => window.location.href = '/instructor'}>Instructor</button>
        <button onClick={() => window.location.href = '/courses'}>Courses</button>
        <button onClick={() => window.location.href = '/enrollments'}>Enrollments</button>

        {/* Define routes using BrowserRouter and Routes */}
        <BrowserRouter>
          <Routes>
            {/* Student routes */}
            <Route path="/student" element={<ListUserPage />} />
            <Route path="/addnewuser" element={<CreateUser />} />
            <Route path="/student/user/:StudentID/edit" element={<EditUser />} />

            {/* Instructor routes */}
            <Route path="/instructor" element={<ListInstructorPage />} />
            <Route path="/addnewinstructor" element={<CreateInstructor />} />
            <Route path="/instructor/instructor/:InstructorID/edit" element={<EditInstructor />} />

            {/* Courses routes */}
            <Route path="/courses" element={<ListCoursePage />} />
            <Route path="/addnewcourse" element={<CreateCourse />} />
            <Route path="/course/:CourseID/edit" element={<EditCourse />} />

            {/* Enrollments routes */}
            <Route path="/enrollments" element={<ListEnrollmentPage />} />
            <Route path="/addnewenrollment" element={<CreateEnrollment />} />
            <Route path="/enrollment/:EnrollmentID/edit" element={<EditEnrollment />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

// Export the main App component
export default App;

