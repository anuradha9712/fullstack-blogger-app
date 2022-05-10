import '@innovaccer/design-system/css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateBlog from './Pages/Blogs/CreateBlog';
import GetBlog from './Pages/Blogs/GetBlog';
import './App.css';

function App() {
  return (
    <Router>
      <div className='p-8'>
        <Navbar />
        <Routes>
          <Route path='/' element={<GetBlog />} />
          <Route path='/create' element={<CreateBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
