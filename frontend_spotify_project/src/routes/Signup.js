import React, { useState } from 'react';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useCookies } from 'react-cookie';
import harmonixLogo from "../assets/harmonixLogo.png"

const SignupComponent = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cookie, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const signup = async () => {
    if (email !== confirmEmail) {
      alert('Email and confirm email fields must match');
      return;
    }
    const data = { email, password, username, firstName, lastName };
    const response = await makeUnauthenticatedPOSTRequest('/auth/register', data);
    if (response && !response.err) {
      console.log(response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie('token', token, { path: '/', expires: date });
      alert('Success');
      navigate('/home');
    } else {
      alert('Failure');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-black text-white">
      <div className="logo p-3 bg-black w-full flex justify-center">
      <img src={harmonixLogo} alt="Logo" width="150" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-4 text-2xl">Sign up for free to start listening!</div>
        <TextInput
          label="Email address"
          placeholder="Email address"
          className="my-6"
          value={email}
          setValue={setEmail}
          inputClassName="bg-gray-800 text-red" // Set text color to red
        />
        <TextInput
          label="Confirm Email address"
          placeholder="Enter your Email address again"
          className="mb-6"
          value={confirmEmail}
          setValue={setConfirmEmail}
          inputClassName="bg-gray-800 text-red" // Set text color to red
        />
        <TextInput
          label="Username"
          placeholder="Enter Your Username"
          className="mb-6"
          value={username}
          setValue={setUsername}
          inputClassName="bg-gray-800 text-red" // Set text color to red
        />
        <PasswordInput
          label="Create Password"
          placeholder="Create a strong Password"
          className="my-6"
          value={password}
          setValue={setPassword}
          inputClassName="bg-gray-800 text-white" // Set text color to white
        />
        <div className='w-full flex justify-between items-center space-x-4'>
          <TextInput
            label="First Name"
            placeholder="Enter Your First Name"
            className="my-6"
            value={firstName}
            setValue={setFirstName}
            inputClassName="bg-gray-800 text-red" // Set text color to red
          />
          <TextInput
            label="Last Name"
            placeholder="Enter Your Last Name"
            className="my-6"
            value={lastName}
            setValue={setLastName}
            inputClassName="bg-gray-800 text-red" // Set text color to red
          />
        </div>
        <div></div>
        <div className="w-full flex items-center justify-center mt-8 my-6 bg-black">
          <button
            className="bg-red-600 hover:bg-red-500 font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              signup();
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="w-full  border-solid border-gray-700"></div>
        <div className="my-6 font-semibold text-lg">
          Already have an Account?
        </div>
        <div className="border border-gray-500 text-gray-500 hover:bg-red-600 hover:font-bold hover:text-xl hover:text-black font-semibold w-full flex items-center justify-center py-4 rounded-full">
          <Link to="/Login">Log In Instead</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
