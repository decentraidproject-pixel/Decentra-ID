import Header from './Header';
import HomeScreen from './HomeScreen';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Help from './Help';
import StartNow from './StartNow';
import Layout from './Layout';
import FaceAuth from './components/FaceAuth';
import EmailOtp from './components/EmailOTP';
import Payment from './components/Payment';
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import User from "./pages/User";
import RegInfo from './components/RegInfo';
import AdminLogin from './AdminLogin';
import UserLogin from './pages/UserLogin'
import  UserFaceAuth from './components/UserFaceAuth';
import UseremailOTP from './components/UseremailOTP';
import VerifierLogin from './pages/VerifierLogin';
import VerifierPortal from './pages/VerifierPortal';
import UserPortal from './pages/UserPortal';
import UserRegister from './pages/UserRegister';
import UserDashboard from './pages/UserDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import UserLookup from './pages/UserLookup';
import VerifyUserLogin from './components/VerifyUserLogin.jsx';
import UserLookupFaceAuth from './components/UserLookupFaceAuth.jsx';
import VerifierEmailOTP from './components/EmailVer.jsx';
import UserPayment from './components/UserPayment';
import BasicUserLookup from './pages/BasicUserLookup.jsx';
import UserLookupPortal from './pages/VPortal.jsx';
import VPayment from './components/VPayment.jsx';
import UserLookupRegister from './pages/UserLoopupRegister.jsx';


function App(){
  return(
    <>
   
    
   <Routes>
  <Route path="/" element={<Layout />}>

    <Route index element={<HomeScreen />} />
        <Route path="User-EmailOTP-Verification" element={<UseremailOTP />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="help" element={<Help />} />
    <Route path="startNow" element={<StartNow />} />
  
    <Route path="payment" element={<Payment />} />
    <Route path="reginfo" element={<RegInfo />} />

    <Route path="admin" element={<Admin />} />
    <Route path="user" element={<User />} />
    <Route path="adminLogin" element={<AdminLogin />} />
    <Route path="admin-login" element={<AdminLogin />} />
    
    <Route path="userfaceAuth" element={<UserFaceAuth />} />
<Route path="VPayment" from element={<VPayment/>}/>


     <Route path="FaceAuth" element={<FaceAuth />}/>
<Route path="EmailOTP" element={<EmailOtp />} />

     <Route path="UserLookupFaceAuth" element={<UserLookupFaceAuth />}/ >
<Route path="VerifyUserLogin" element={<VerifyUserLogin />} />

<Route path="Verifier-EmailOTP" element={<VerifierEmailOTP/>}/>
    <Route path="BasicUserLookup" element={<BasicUserLookup/>} />
<Route path="userLookup-portal" element={<UserLookupPortal />} />

     <Route path="user-Portal" element={<UserPortal/>}>
      
      
    </Route>

    <Route path="user-Login" element={<UserLogin/>} />
      <Route path="userRegister" element={<UserRegister />} />
    <Route path="user-dashboard" element={<UserDashboard/>}/>

    <Route path="UserLookupRegister" element={<UserLookupRegister/>}/>
    <Route path="verifier-Portal" element={<VerifierPortal />}>
    
      
      
      
      
    </Route>

    <Route path="verifier-Login" element={<VerifierLogin />} />
    <Route path="verifier-dashboard" element={<VerifierDashboard/>}/>
    <Route path="register" element={<Register />} />


<Route path="UserLookup" element={<UserLookup/>}/>



<Route path="UserPayment" element={<UserPayment/>}/>
  </Route>
</Routes>
   
   
   </>
  )
}
export default App;
