import React from 'react';
import gif from '../../../photo/home_img_1.png'
import { Link } from 'react-router-dom';
import './home.css';
import Navbar from '../navbar_page/Navbar';

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <header className="hero-section">
                <h1 className='font-medium text-2xl'>Welcome to Elansol Contact Manager application</h1>
                <img src={gif} alt="Home Animation" />
                <p className='tagLine'>Your one-stop solution for managing your employee data efficiently.</p>
                <section className='home_link_section'>
                    <Link to="/login" className="primary-button1">Get Signup</Link>
                    <Link to="/register" className="primary-button2">Get Register</Link>
                </section>
            </header>
        </div>
    );
};

export default Home;
