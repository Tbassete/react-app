import React from 'react';
import { NavLink } from 'react-router-dom';
import sapaLogo from '../assets/sapa.png';


// import './Cabeca.css'; // opcional: se for usar estilo

function Cabeca() {
  return (
    <div className="container-Header">
      <img src={sapaLogo} alt="" className='sapaLogo'/>
      <h1>Job observation</h1>
      <nav className="nav-bar">
        {
          localStorage.getItem('@1app/displayname') === null ?
          <>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Login</NavLink>
          </>
          :
          <>
            <NavLink to='/'>Users</NavLink>
            <NavLink to='/logout'>Logout</NavLink>
          </>
        }
      </nav>
    </div>
  );
}

export default Cabeca;