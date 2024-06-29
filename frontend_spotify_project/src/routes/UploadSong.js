import { Icon } from '@iconify/react';
import { Cloudinary } from 'cloudinary-core';
import { isHtmlElement } from 'react-router-dom';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import IconText from '../components/shared/IconText';
import TextInput from '../components/shared/TextInput';
import TextWithHover from '../components/TextWithHover';
import { useState } from 'react';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useNavigate } from 'react-router-dom';
import LoggedInContainer from '../containers/LoggedInContainer';

export default function UploadSong(){
    const[name,setName]=useState("");
    const[thumbnail,setThumbnail]=useState("");
    const[playlistUrl, setPlaylistUrl]=useState("");
    const[uploadedSongFileName,setUploadedSongFileName]=useState("");
    const navigate=useNavigate();
    const submitSong = async () =>{

        const data = {name, thumbnail,track:playlistUrl}
        const response = await makeAuthenticatedPOSTRequest("/song/create",data);
        if(response.err){
            alert("could not create song")
            return;
        }
        alert("Success");
        navigate("/home");
    }
    console.log(window.cloudinary);
    // return (
        // <div className="h-full w-full flex">
        //     {/*this div will be left pannel*/}
        //     <div className="h-full w-1/5 bg-black flex flex-col justify-between">
        //     <div>
        //         <div className="logoDiv p-5">
        //             <Icon icon="logos:spotify" width="125"/>
        //         </div>
        //         <div className='py-5'>
        //             <IconText 
        //                 iconName={"material-symbols:home"}
        //                 displayText={"Home"}
        //                 active
        //             />
        //             <IconText 
        //                 iconName={"material-symbols:search"}
        //                 displayText={"Search"}
        //             />
        //             <IconText 
        //                 iconName={"solar:library-linear"}
        //                 displayText={"Your Library"}
        //             />
        //             <IconText 
        //                 iconName={"material-symbols:library-music-sharp"}
        //                 displayText={"My music"}
        //             />
        //         </div>
        //         <div className='pt-7'>
        //             <IconText 
        //                 iconName={"zondicons:add-outline"}
        //                 displayText={"Create Playlist"}
        //             />
        //             <IconText 
        //                 iconName={"icon-park-twotone:like"}
        //                 displayText={"Liked Songs"}
        //             />
        //         </div>
        //     </div>
        //         <div className='px-5 pb-10'>
        //             <div className='border border-gray-100 text-white w-2/5 px-2 py-1 flex rounded-full items-center justify-center hover:boder-white cursor-pointer'>
        //                 <Icon icon="ph:globe"/>
        //                 <div className='ml-2 text-sm font-semibold'>English</div>
        //             </div>
        //         </div>
        //     </div>
            
        //     {/*this div will be the right pannel*/}
        //     <div className="h-full w-4/5 bg-neutral-800 overflow-auto">

        //         <div className='navbar w-full h-20 bg-black bg-opacity-30 flex items-center justify-end'>
        //             <div className='w-1/2 flex h-full'>

        //                 <div className='w-3/5 flex justify-around items-center'>
        //                 <TextWithHover displayText={"Premium"}/>
        //                 <TextWithHover displayText={"Support"}/>
        //                 <TextWithHover displayText={"Download"}/>
        //                 <div className='h-1/2 border border-white'></div>
        //                 </div>
                        
        //                 <div className='w-2/5 flex justify-around h-full items-center'>
        //                 <TextWithHover displayText={"Upload Song"}/>
        //                 <div className='bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer'>DM</div>
        //                 </div>
                        
        //             </div>
        //         </div>

        //         <div className='content p-8 pt-0 overflow-auto'>
        //             <div className='text-2xl font-semibold mb-5 text-white mt-8'>
        //             upload your music
        //             </div>

        //             <div className='w-2/3 flex space-x-3'>

        //             <div className="w-1/2">
        //                 <TextInput label="Name" labelClassName={"text-white"} placeholder="Name" value={name} setValue={setName}/>
        //             </div>
        //             <div className="w-1/2">
        //                 <TextInput label="Thumbnail" labelClassName={"text-white"} placeholder="Thumbnail" value={thumbnail} setValue={setThumbnail}/>
        //             </div>
        //             </div>
                    
        //             <div className='py-5'>
        //             {
        //                 uploadedSongFileName?(
        //                 <div className='bg-white rounded-full p-3 w-1/3'>
        //                     {uploadedSongFileName.substring(0,20)}...
        //                 </div>
        //                 ):(
        //                 <CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedSongFileName}/>
        //                 )}
        //             </div>
        //             <div>
        //                  <div className='bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font font-semibold 'onClick={submitSong}>
        //                     Submit Song
        //                  </div>   
        //             </div>
        //         </div>
        //     </div>
        // </div>


        return(
            <LoggedInContainer>
    <div className='text-white mb-5 mt-8 text-left font-semibold text-2xl'>
                            Upload Your Music
                        </div>
    
                        <div className='w-2/3 flex space-x-3'>
                            <div className='w-1/2'>
    
                                <TextInput 
                                    label={"Name"} 
                                    placeholder={"Name"} 
                                    labelClassName={"text-white"}
                                    value={name}
                                    setValue={setName}
                                />
    
                            </div>
                            <div className='w-1/2'>
                                <TextInput 
                                    label={"Thumbnail"} 
                                    placeholder={"Thumbnail"} 
                                    labelClassName={"text-white"}
                                    value={thumbnail}
                                    setValue={setThumbnail}
                                />
                            </div>
                        </div>
    
                        <div className='text-left py-5' >
    
                            {/* if user has uploaded a song then the uploaded songs name should be displayed, if not then 'select Song' button should be displayed */}
                            {
                                uploadedSongFileName?(
                                    <div className='bg-white text-black w-1/3 rounded-full p-3'> {uploadedSongFileName.substring(0,20)}.... </div>
                                ):(
                                    <CloudinaryUpload 
                                        
                                        setUrl={setPlaylistUrl}
                                        setName={setUploadedSongFileName}  /* set Url will store the playlist url from the cloudinaryUpload page */
                                    />
                                )
                            } 
    
                        </div>
                        <div className='w-40 p-3 bg-white text-black font-semibold rounded-full cursor-pointer hover:bg-gray-200' onClick={submitSong}>Sumbit Track</div>
    
            </LoggedInContainer>
    );
};


