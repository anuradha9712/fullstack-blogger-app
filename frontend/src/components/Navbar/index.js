import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='d-flex w-100 mb-8 position-sticky justify-content-center'>
      <Link to='/login' className='ml-0 Navbar_link'>Login</Link>
      <Link to='/signup' className='ml-6 Navbar_link'>Signup</Link>
      <Link to='/' className='ml-6 Navbar_link'>Home</Link>
      <Link to='/create' className='ml-6 Navbar_link'>Create Blog</Link>
    </div>
  )
}

export default Navbar;
