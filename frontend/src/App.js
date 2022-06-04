import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateBlog from './Pages/Blogs/CreateBlog';
import GetBlog from './Pages/Blogs/GetBlog';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import '@innovaccer/design-system/css';
import './App.css';

function App() {
  return (
    <Router>
      <div className='p-8'>
        <Navbar />
        <Routes>
          <Route path='/' element={<GetBlog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreateBlog />} />
          <Route path='/signup' element={<Signup />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
