import React from 'react'
import './navbar.css'
import logo from '../../../photo/home_logo.png'
import { useNavigate } from 'react-router';

const Navbar = () => {
    const nav = useNavigate();
    return (
        <div className='nav_container'>
            <nav className='nav'>
                <img onClick={() => nav('/')} className='brand_logo' src={logo} alt="logo" />
                <h1 onClick={() => nav('/')}>Home</h1>
                {/* <h1 onClick={() => nav('/')}>About</h1> */}
                <h1 onClick={() => nav('/register')}>Register</h1>
                <h1 onClick={() => nav('/login')}>Login</h1>
            </nav>
        </div>
    )
}

export default Navbar
