import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateBlog from './Pages/Blogs/CreateBlog';
import GetBlog from './Pages/Blogs/GetBlog';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import '@innovaccer/design-system/css';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<GetBlog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreateBlog />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
