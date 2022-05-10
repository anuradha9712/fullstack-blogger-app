import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='d-flex w-100 position-sticky justify-content-center'>
      <Link to='/' className='ml-0 Navbar_link'>Home</Link>
      <Link to='/create' className='ml-6 Navbar_link'>Create</Link>
    </div>
  )
}

export default Navbar;
