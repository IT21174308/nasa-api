import Dashboard from './pages/common/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/common/NotFound'
import LandingPage from './pages/nasa/LandingPage'
import Loader from './components/Loader'
import MarsRoverPhotos from './pages/nasa/MarsRoverPhotos'
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import Profile from './pages/common/Profile'
import { AuthProvider } from './pages/common/AuthContext'
import Earth from './pages/nasa/Earth'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />

            <Route path='/' element={<Dashboard />}>
              <Route path='' element={<LandingPage />} />
              <Route path='loader' element={<Loader />} />
              
              
              <Route path='profile' element={<Profile />} />
              <Route path='mars-rover-photos' element={<MarsRoverPhotos />} />
              <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='/user' element={<Dashboard />}>
              <Route path='' element={<LandingPage />} />
              <Route path='profile' element={<Profile />} />
              <Route path='mars-rover-photos' element={<MarsRoverPhotos />} />
              <Route path='earth' element={<Earth />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>

        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
