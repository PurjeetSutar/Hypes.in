
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import StartupPage from './pages/StartUpPage/StartUpPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartupFeedPage from './pages/StartupFeedPage/StartupFeedPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage/ForgetPasswordPage';
import NotificationPage from './pages/NotificationPage/NotificationPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import FirstPage from './pages/FirstPage/FirstPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FirstPage />} />
          <Route path='/Loginpage' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path="/startup/:startupId" element={<StartupPage />} />
          <Route path="/startupfeed" element={<StartupFeedPage />} />
          <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path='/*' element= {<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
