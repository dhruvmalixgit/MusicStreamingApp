import { Icon } from '@iconify/react';
import {useCookies} from "react-cookie";
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
const SignupComponent = () =>{
    const[email,setEmail]=useState("");
    const[confirmEmail,setConfirmEmail]=useState("");
    const[password,setPassword]=useState("");
    const[username,setUsername]=useState("");
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[cookie,setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const signup= async()=>{
        if(email!==confirmEmail){
            alert("email and confirm email field must match");
            return;
        }
        const data = {email,password,username,firstName,lastName};
        const response=await makeUnauthenticatedPOSTRequest("/auth/register",data);
        if(response && !response.err){
            console.log(response);
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate()+30)
            setCookie("token",token,{path:"/",expires:date});
            alert("success");
            navigate("/home");
        }
        else{
            alert("failure");
        }
    };
    return(
        <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-6 border-b border-solid border-gray-300 w-full flex justify-center">
                <Icon icon="logos:spotify" width="150"/>
            </div>
            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                {/*in this we will have 2 inputs email and password*/}
                <div className="font-bold mb-4 text-2xl">Sign up for free to start listening!</div>
                    <TextInput
                    label="Email address" placeholder="Email address" className="my-6" value={email} setValue={setEmail}
                    />
                    <TextInput
                    label="Confirm Email address" placeholder="Enter your Email address again" className="mb-6" value={confirmEmail} setValue={setConfirmEmail}
                    />
                    <TextInput
                    label="UserName" placeholder="Enter Your UserName" className="mb-6" value={username} setValue={setUsername}
                    />
                    <PasswordInput
                    label="Create Password" placeholder="Create a strong Password" className="my-6" value={password} setValue={setPassword}
                    />
                    <div className='w-full flex justify-between items-center space-x-4'>
                    <TextInput
                    label="First Name" placeholder="Enter Your First name" className="my-6" value={firstName} setValue={setFirstName}
                    />
                    <TextInput
                    label="Last Name" placeholder="Enter Your Last name" className="my-6" value={lastName} setValue={setLastName}
                    />
                    </div>
                    <div className="w-full flex item-center justify-center mt-8 my-6">
                        <button className="bg-green-400 font-semibold p-3 px-10 rounded-full " onClick=
                        {
                            (e)=>{
                                e.preventDefault();
                                signup();
                            }}
                        >Sign Up</button>
                    </div>
                    <div className="w-full border border-solid border-gray-300">
                    </div>
                    <div className="my-6 font-semibold text-lg"> Already have an Account?</div>
                    <div className="border border-gray-500 text-gray-500 font-semibold w-full flex items-center justify-center py-4 rounded-full"><Link to="/Login">Log In Instead</Link></div>
                    
            </div>   
        </div>
    )
};
export default SignupComponent;