
import {Routes, Route} from "react-router-dom"
import SignupPage from "./Pages/Auth/SignupPage";
import LoginPage from "./Pages/Auth/LoginPage";
import Navbar from "./Components/Common/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ContactusPage from "./Pages/ContactusPage.jsx/ContactusPage";
import Dashboard_Student from "./Pages/Dashboard/Student_Dashboard/Dashboard_Student";
import PrivateRoute from "./Pages/Routes/PrivateRoute";
import EnterOtpPage from "./Pages/Auth/EnterOtpPage";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import CheckEmail from "./Pages/Auth/CheckEmail";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import Dashboard_Instructor from "./Pages/Dashboard/Instructor_Dashboard/Dashboard_Instructor";
import LogoutInstructor from "./Pages/Dashboard/Instructor_Dashboard/LogoutInstructor";
import Mycourses from "./Pages/Dashboard/Instructor_Dashboard/Mycourses";
import ProfileInstructor from "./Pages/Dashboard/Instructor_Dashboard/ProfileInstructor";
import EditProfileInstructor from "./Pages/Dashboard/Instructor_Dashboard/EditProfileInstructor";
import CourseInformation from "./Pages/Dashboard/Instructor_Dashboard/Create_Course/CourseInformation";
import CreateSection from "./Pages/Dashboard/Instructor_Dashboard/Create_Course/CreateSection";
import SaveAndPublish from "./Pages/Dashboard/Instructor_Dashboard/Create_Course/SaveAndPublish";
import Profile from "./Pages/Dashboard/Student_Dashboard/Profile";
import EnrolledCourses from "./Pages/Dashboard/Student_Dashboard/EnrolledCourses";
import Courses from "./Pages/Dashboard/Student_Dashboard/Courses";
import EditProfile from "./Pages/Dashboard/Student_Dashboard/EditProfile";
import Logout from "./Pages/Dashboard/Student_Dashboard/Logout";
import BuyCourse from "./Pages/Dashboard/Student_Dashboard/BuyCourse";
import PlayVideo from "./Pages/Dashboard/Student_Dashboard/OpenCourse";
import OpenCourse from "./Pages/Dashboard/Student_Dashboard/OpenCourse";


function App() {
  return (
    <div className="App bg-[#000814] w-full">

      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<ContactusPage/>} />

        <Route path="/verify-email" element={<EnterOtpPage/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/check-email" element={<CheckEmail/>}/>
         <Route path="/update-password/:id" element={<UpdatePassword/>}/>


          {/* for student  */}
        <Route 
            path="/student-dashboard" 
            element={
                      <PrivateRoute>
                        <Dashboard_Student/>
                      </PrivateRoute>
                    }>
            <Route path="/student-dashboard/profile" element={<Profile/>}/>
            <Route path="/student-dashboard/profile/editProfile" element={<EditProfile/>}/>
            <Route path="/student-dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
            <Route path="/student-dashboard/enrolled-courses/course/:courseId" element={<OpenCourse/>}/>
            <Route path="/student-dashboard/enrolled-courses/course/:courseId/video/:video" element={<OpenCourse/>}/>
            <Route path="/student-dashboard/courses" element={<Courses/>}/>
            <Route path="/student-dashboard/courses/buy-course/:courseId" element={<BuyCourse/>}/>
            <Route path="/student-dashboard/logout" element={<Logout/>}/>
        </Route>
        

        {/* FOr instructor  */}
        <Route 
            path="/instructor-dashboard"  element={
                                                    <PrivateRoute>
                                                      <Dashboard_Instructor/>
                                                    </PrivateRoute>
                                                  }>

              <Route path="/instructor-dashboard/courses" element={<Mycourses/>}/>
              <Route path="/instructor-dashboard/profile" element={<ProfileInstructor/>}/>
              <Route path="/instructor-dashboard/profile/editProfile" element={<EditProfileInstructor/>}/>
              <Route path="/instructor-dashboard/logout" element={<LogoutInstructor/>}/>
              <Route path="/instructor-dashboard/courses/courseInfo" element={<CourseInformation/>}/>
              <Route path="/instructor-dashboard/courses/courseInfo/section" element={<CreateSection/>}/>
              <Route path="/instructor-dashboard/courses/courseInfo/section/publish" element={<SaveAndPublish/>}/>

        </Route>   

      </Routes>


    </div>
  );
}

export default App;
