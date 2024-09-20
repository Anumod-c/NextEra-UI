import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/user/UserRoutes';
import TutorRoutes from './routes/tutor/TutorRoutes';

function App() {

  return (

    <Router>
      <Routes>
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/tutor/*' element={<TutorRoutes />} />
        <Route path='/*' element={<UserRoutes />} />
      </Routes>
    </Router>
    
  
  )
}

export default App
