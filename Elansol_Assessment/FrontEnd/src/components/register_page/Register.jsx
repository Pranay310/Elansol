import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectValidations, validatePhone } from '../../redux/slice';
import { addUser } from '../../utils/api';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './register.css';
import empolyee3 from '../../../photo/register_img3.png';
import logo from '../../../photo/home_logo.png';

const Register = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const validations = useSelector(selectValidations);

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    if (validations.userNameRegex.test(value)) {
      setUserName(value);
    } else {
      alert('Enter a valid user name');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNum(value);
    dispatch(validatePhone(value));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPass(e.target.value);
  };

  const handleConfirmPassChange = (e) => {
    setConfirmPass(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const isEmailValid = validations.emailRegex.test(email);
    const isPasswordValid = validations.passwordRegex.test(pass);
    const isPhoneValid = validations.phoneValid;

    if (!userName || !phoneNum || !email || !pass) {
      alert('All fields are required.');
      return;
    }

    if (!isEmailValid) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isPasswordValid) {
      alert('Password must have one uppercase letter, a special character, and be at least 5 characters long.');
      return;
    }

    if (!isPhoneValid) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    if (pass !== confirmPass) {
      alert('Passwords do not match.');
      return;
    }

    addUser(userName, pass);
    alert('User added successfully!');
    nav('/login');
  };

  return (
    <div className="container">
      <nav className="register_nav">
        <img className="brand_logo" src={logo} alt="logo" />
        <h1 onClick={() => nav('/')}>Home</h1>
        <h1 onClick={() => nav('/register')}>Register</h1>
        <h1 onClick={() => nav('/login')}>Login</h1>
      </nav>

      <main className="main_section">
        <article className="register1_article">
          <section>
            <div className="holding_register_text">
              <p>REGISTER HERE</p>
              <span>
                If you have an account{' '}
                <span className="text-blue-400 cursor-pointer" onClick={() => nav('/login')}>
                  Sign in here
                </span>
                !
              </span>
            </div>
            <img className="emp_img" src={empolyee3} alt="Employee" />
          </section>
        </article>

        <article className="register_article">
          <p>Let us know you!</p>
          <section>
            <form>
              <div className="holding_textfileds">
                <TextField
                  sx={{ width: '47.5%' }}
                  label="Enter Name"
                  variant="filled"
                  value={userName}
                  onChange={handleUserNameChange}
                />

                <TextField
                  label="Email"
                  variant="filled"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  sx={{ width: '47.5%' }}
                />
              </div>

              <TextField
                sx={{ width: '100%' }}
                label="Enter Phone No."
                variant="filled"
                value={phoneNum}
                onChange={handlePhoneChange}
                error={!validations.phoneValid}  // Show error if phone number is invalid
                helperText={validations.phoneValid ? '' : 'Phone number must be 10 digits'}  // Error message
              />

              <div className="holding_textfileds">
                <TextField
                  label="Password"
                  variant="filled"
                  type={showPassword ? 'text' : 'password'}
                  value={pass}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Confirm Password"
                  variant="filled"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={handleConfirmPassChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <Button variant="contained" sx={{ width: '200px', height: '50px' }} onClick={onSubmitForm}>
                Register
              </Button>
            </form>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Register;
