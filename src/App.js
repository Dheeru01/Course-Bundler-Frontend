import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer'; 
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Subscribe from './components/subscribe/Subscribe';
import PaymentSuccess from './components/subscribe/PaymentSuccess';
import PaymentFailed from './components/subscribe/PaymentFailed';
import Notfound from './components/subscribe/NotFound';
import Requests from './components/Requests/Requests';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast,{Toaster} from "react-hot-toast"
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react'
import Loader from './components/Layout/Loader/Loader';
function App() {

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  const {isAuthenticated, user, message, error, loading} = useSelector(state => state.user)

  const dispatch  = useDispatch()

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type: 'clearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }

  }, [dispatch, error, message])

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])

  return (
    <Router>
      {
        loading ? (<Loader />): (
          <>
          
          <Header isAuthenticated={isAuthenticated} user={user}  />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/request" element={<Requests/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path='/course/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} ><CoursePage user={user} /></ProtectedRoute>} />
        <Route path="/login" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' ><Login/></ProtectedRoute>}/>
        <Route path='/register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' ><Register /></ProtectedRoute>} />
        <Route path='/forgotpassword' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' ><ForgotPassword /></ProtectedRoute>} />
        <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' ><ResetPassword /></ProtectedRoute>} />
        <Route path='/about' element={<About />} />
        <Route path='/subscribe' element={<ProtectedRoute isAuthenticated={isAuthenticated} ><Subscribe user={user} /></ProtectedRoute>} />
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/paymentfailed' element={<PaymentFailed />} />
        <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} ><Profile user={user} /></ProtectedRoute>} />
        <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated={isAuthenticated} ><UpdateProfile user={user} /></ProtectedRoute>} />
        <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated} ><ChangePassword /></ProtectedRoute>} />
        <Route path='/admin/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'} ><Dashboard /></ProtectedRoute>} />
        <Route path='/admin/createcourse' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'} ><CreateCourse /></ProtectedRoute>} />
        <Route path='/admin/courses' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'} ><AdminCourses /></ProtectedRoute>} />
        <Route path='/admin/users' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'} ><Users /></ProtectedRoute>} />
        <Route path='*' element={<Notfound />} />
      </Routes>
      <Footer/>
      <Toaster/>

          </>
        )
      }
    </Router>
  );
}
 
export default App;
