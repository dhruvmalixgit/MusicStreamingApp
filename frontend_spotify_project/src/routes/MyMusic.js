import { Icon } from '@iconify/react';
import {Howl, Howler} from 'howler';
import IconText from '../components/shared/IconText';
import SingleSongCard from '../components/shared/SingleSongCard';
import TextWithHover from '../components/TextWithHover';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import { useState} from 'react';
import { useEffect } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';


const MyMusic = () =>{
    const[songData, setSongData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysongs"
            );
            setSongData(response.data);
        };
        getData();
    }, []);
    return(
        <LoggedInContainer currentActiveScreen={"myMusic"}>
        <div className='text-white text-xl font-semibold pb-4 pl-2 pt-8'>My Songs</div>
        <div className="space-y-3 overflow-auto ">
                {songData.map((item)=>{
                return<SingleSongCard info={item} playSound={()=>{}}/>;
            })}
            </div>
        </LoggedInContainer>
    );
};
export default MyMusic;
