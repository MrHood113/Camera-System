import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Login, ManageCameras, Register, CreateCamera, CameraDetail, LivePage, StreamCameraDetail, MyCameraPage, ProfilePage, DashboardPage } from './pages'
// import PrivateRoute from './routes/PrivateRoute'
import { Navbar, } from './components'

function App() {

  const location = useLocation();

  // Not display Navbar
  const hideNavbarPaths = ['/login', '/register',];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
      <main className="flex-grow">
        {!shouldHideNavbar && <Navbar />}
        
        <Routes>
          <Route path="/" element={<Navigate to="/stream-cameras" />} />
          <Route path="/manage-cameras" element={<ManageCameras />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-cameras" element={
            //<PrivateRoute>
              <CreateCamera />
           // </PrivateRoute>
            }/>
          <Route path="/camera/:id" element={<CameraDetail />} />
          <Route path="/stream-cameras" element={<LivePage />} />
          <Route path="/stream-camera/:slug/:id" element={<StreamCameraDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-camera" element={<MyCameraPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
  )
}

export default App
