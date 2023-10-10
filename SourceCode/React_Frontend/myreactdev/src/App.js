import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
    <div className="vh-100 gradient-custom">
      <div className="container">
        <h1 className="page-header text-center">Student Report Card - Syed Husain </h1>
        <h1  className="page-header text-center">Class: CMSC 447</h1>

        <button onClick={() => window.location.href = '/student'}>Student</button>
        <button onClick={() => window.location.href = '/instructor'}>Instructor</button>
        <button onClick={() => window.location.href = '/courses'}>Courses</button>
        <button onClick={() => window.location.href = '/enrollments'}>Enrollments</button>

        <BrowserRouter>
          <Routes>
            <Route path="/student" element={<ListUserPage />} />
            <Route path="/addnewuser" element={<CreateUser />} />
            <Route path="/student/user/:StudentID/edit" element={<EditUser />} />

            <Route path="/instructor" element={<ListInstructorPage />} />
            <Route path="/addnewinstructor" element={<CreateInstructor />} />
            <Route path="/instructor/instructor/:InstructorID/edit" element={<EditInstructor />} />

            <Route path="/courses" element={<ListCoursePage />} />
            <Route path="/addnewcourse" element={<CreateCourse />} />
            <Route path="/course/:CourseID/edit" element={<EditCourse />} />

            <Route path="/enrollments" element={<ListEnrollmentPage />} />
            <Route path="/addnewenrollment" element={<CreateEnrollment />} />
            <Route path="/enrollment/:EnrollmentID/edit" element={<EditEnrollment />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
