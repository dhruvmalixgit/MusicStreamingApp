import { Icon } from '@iconify/react';
import { useState } from 'react';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useCookies } from 'react-cookie';
const LoginComponent = () =>{

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[cookie,setCookie] = useCookies(["token"]);

    const [displayLoading, setDisplayLoading] = useState(false);


    const navigate = useNavigate();
    const login= async()=>{
        setDisplayLoading(true);
        const data = {email,password};
        const response=await makeUnauthenticatedPOSTRequest("/auth/login",data);
        setDisplayLoading(true);
        if(response && !response.err){
            setDisplayLoading(false);
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
            setDisplayLoading(false);
        }
    };
    return(
        <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-6 border-b border-solid border-gray-300 w-full flex justify-center">
                <Icon icon="logos:spotify" width="150"/>
            </div>
            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                {/*in this we will have 2 inputs email and password*/}
                <div className="font-bold mb-4">To continue login to Spotify</div>
                    <TextInput
                    label="Email address or Username" value={email} setValue={setEmail} placeholder="Email address or Username" className="my-6"
                    />
                    <PasswordInput
                    label="Password" value={password} setValue={setPassword}  placeholder="Password" className="my-6"
                    />
                    <div className="w-full flex item-center justify-end mt-8 my-6">
                        <button className="bg-green-400 font-semibold p-3 px-10 rounded-full"
                            onClick={(e)=>{
                                e.preventDefault();
                                login();
                            }}>LOG IN
                        </button>
                    </div>
                    <div className="w-full border border-solid border-gray-300">
                    </div>
                    <div className="my-6 font-semibold text-lg"> Don't have an account?</div>
                    <div className="border border-gray-500 text-gray-500 font-semibold w-full flex items-center justify-center py-4 rounded-full"><Link to="/Signup">SIGN UP FOR SPOTIFY</Link></div>
                    

                    {
                        displayLoading?(
                            <div className='flex justify-center pt-5'>
                                <Icon icon="line-md:loading-loop"  fontSize={40}/>
                            </div>
                        ):(
                            <div className='flex justify-center pt-5'>
                                {/* <Icon icon="line-md:loading-loop"  fontSize={40}/> */}
                            </div>
                        )
                    }

                    
            </div>   
        </div>
    )
};
export default LoginComponent;