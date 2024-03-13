import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupSuccess, signupFailure } from '../store/userSlice/userSlice';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  password: string;
  error: string;
}

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    error: ''
  });

  const { name, email, password, error } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegistration = async () => {
    try {
      const response:any = await axios.post('http://localhost:3000/api/v1/user/signup/', {
        name,
        email,
        password
      });
      const { userEmail } = response.data; // Assuming the API returns the email upon successful registration
      const userId=response.data.user._id
      navigate('/add'); 
      dispatch(signupSuccess({ email: userEmail,id:userId}));
    } catch (error:any) {
      dispatch(signupFailure(error.response.data.message));
      setFormData({
        ...formData,
        error: error.response.data.message
      });
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <button onClick={handleRegistration}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegistrationPage;
