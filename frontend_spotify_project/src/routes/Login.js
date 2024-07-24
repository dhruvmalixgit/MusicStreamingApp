import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useCookies } from 'react-cookie';
import harmonixLogo from '../assets/harmonixLogo.png';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useCookies(['token']);
  const [displayLoading, setDisplayLoading] = useState(false);

  const navigate = useNavigate();
  
  const login = async () => {
    setDisplayLoading(true);
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest('/auth/login', data);
    setDisplayLoading(false);
    if (response && !response.err) {
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
      <div className="logo p-3  bg-black w-full flex justify-center">
        <img src={harmonixLogo} alt="Logo" width="150" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-4 text-2xl">To continue, log in to Harmonix</div>
        <TextInput
          label="Email address or Username"
          value={email}
          setValue={setEmail}
          placeholder="Email address or Username"
          className="my-6"
          inputClassName="bg-gray-800 text-red" // Set text color to red
        />
        <PasswordInput
          label="Password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          className="my-6"
          inputClassName="bg-gray-800 text-white" // Set text color to white
        />
        <div className="w-full flex items-center justify-end mt-8 my-6">
          <button
            className="bg-red-600 hover:bg-red-500 font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            LOG IN
          </button>
        </div>
        <div className="w-full border border-solid border-gray-700"></div>
        <div className="my-6 font-semibold text-lg">
          Don't have an account?
        </div>
        <div className="border border-gray-500 text-gray-500 hover:bg-red-600 hover:font-bold hover:text-xl hover:text-black font-semibold w-full flex items-center justify-center py-4 rounded-full">
          <Link to="/Signup">SIGN UP FOR HARMONIX</Link>
        </div>

        {displayLoading && (
          <div className="flex justify-center pt-5">
            <Icon icon="line-md:loading-loop" fontSize={40} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
