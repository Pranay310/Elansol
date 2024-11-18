import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { loginUser } from '../../utils/api';
import './login.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar_page/Navbar'
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import empolyee2 from '../../../photo/register_img2.png'
import employee3 from '../../../photo/login_img.png'
// import shape1 from '../../../photo/Group-8.png'
import shape2 from '../../../photo/Group-11.png'
import shape3 from '../../../photo/Group-4.png'
import shape4 from '../../../photo/Group.png'
import shape5 from '../../../photo/Group-8.png'
import shape6 from '../../../photo/Group-7.png'
import shape7 from '../../../photo/Group-12.png'

const Login = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async () => {
    const isSuccess = await loginUser(userName, password);
    if (isSuccess) {
      nav('/dashboard'); // Navigate to the dashboard on success
    }
  };


  return (
    <div>
      <Navbar/>
      <main className='login_main'>
        {/* <img className='right-0 bottom-0 z-10 absolute' src={shape2} alt="" />
        <img className='top-10 right-14 z-10 absolute' src={shape3} alt="" />
        <img className='bottom-[35vh] left-[10vw] z-10 absolute' src={shape4} alt="" />
        <img className='bottom-10 left-36 z-10 absolute' src={shape5} alt="" />
        <img className='top-30 right-28 z-10 absolute' src={shape6} alt="" />
        <img className='top-10 left-14 z-10 absolute' src={shape7} alt="" /> */}
        <article className='login_article'>
          <section className='login_section1'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='m-8 font-bold text-5xl'>Welcome Back</h1>
              <p className='font-semibold'>if you don't have an account you can <span style={{color:"blue", cursor:"pointer"}} onClick={()=>{nav('/register')}}>Register here!</span></p>
            </div>
            <img src={employee3} alt="" />
          </section>
          <section className='login_section2'>
            <h1 className='font-bold text-4xl'>Login</h1>
            <form>
              <TextField id="outlined-basic"
                label="Username"
                variant="filled"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                sx={{ width: "250px" }} />

              <TextField
                label="Password"
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button variant="contained" onClick={handleSubmit}>Login</Button>
            </form>
            <hr />
            <p>Don't have account <span className='text-blue-600 cursor-pointer' onClick={() => nav('/register')}>register here !</span></p>
          </section>
        </article>
      </main>
    </div>
  )
}

export default Login
