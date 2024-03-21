import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home" element={<ProtectedRoute>  <Home/>   </ProtectedRoute>}  />
          
        </Routes>
      </BrowserRouter>
  )
}

export default App


