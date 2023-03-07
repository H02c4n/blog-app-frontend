import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useAuthCalls from '../../hooks/useAuthCalls'
import profile from '../../assets/avatar.png'
import {BiEdit} from 'react-icons/bi'

const Navbar = () => {


  const { currentUser, currentUserId} = useSelector((state) => state.auth);
  const { currentAuthor, themes } = useSelector((state) => state.blog);


  const customStyle = {
  }

  themes?.forEach(theme => {
    if (theme.theme_owner_id === currentUserId) {
      customStyle.first_color = theme?.first_color;
    customStyle.second_color = theme?.second_color;
    customStyle.font_color = theme?.font_color;
    customStyle.font_size = theme?.font_size;
    }
  });

  const { logout } = useAuthCalls();


  return (<>
    <nav style={{backgroundColor:customStyle.first_color}} className={customStyle?.first_color ? 'navbar navbar-expand-lg' : 'navbar navbar-expand-lg bg-light'}  >
      <div className="container-fluid d-flex justify-content-between">
        <Link to="/"> <img style={{ width: "50px", height: "50px" }} className='rounded-circle' src={currentAuthor?.image ? currentAuthor?.image : profile} alt="avatar" /></Link>

        <div className='d-flex'>
          {currentUser && (<><Link className="nav-link me-3 fw-bold" to="/profile">Profile</Link>
            <Link className="nav-link me-3 fw-bold" to="/new"><BiEdit/> Write </Link></>)}


          {currentUser ? (<Link onClick={() => logout()} className="nav-link fw-bold" to="/">Logout</Link>) : (<Link className="nav-link fw-bold" to="/login">Login</Link>)}

        </div>
      </div>
    </nav>
  </>

  )
}

export default Navbar